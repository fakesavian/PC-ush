import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PlusIcon,
  GripVerticalIcon,
  EditIcon,
  TrashIcon,
  TargetIcon,
  GridIcon,
  ListIcon,
  ShareIcon,
  SettingsIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import { STAGE_TRACKS_DATA } from "@/polymet/data/stage-tracks-data";

// Interfaces
interface VisionItem {
  id: string;
  title: string;
  category: "Career" | "Relationships" | "Health" | "Legacy" | "Other";
  userNotes: string;
  createdAt: string;
  linkedStage?: 1 | 2 | 3 | 4 | 5;
  position: number;
}

interface FutureBoardState {
  visionItems: VisionItem[];
  viewMode: "vision" | "milestone";
  selectedCategory: string | null;
  isEditing: boolean;
  stageProgress: Record<number, number>;
  isAutoSaving: boolean;
}

// Context
const FutureBoardContext = createContext<{
  state: FutureBoardState;
  updateVisionItems: (items: VisionItem[]) => void;
  setViewMode: (mode: "vision" | "milestone") => void;
  setSelectedCategory: (category: string | null) => void;
  setIsEditing: (editing: boolean) => void;
  addVisionItem: (
    item: Omit<VisionItem, "id" | "position" | "createdAt">
  ) => void;
  updateVisionItem: (id: string, updates: Partial<VisionItem>) => void;
  deleteVisionItem: (id: string) => void;
} | null>(null);

// Mock data
const MOCK_VISION_ITEMS: VisionItem[] = [
  {
    id: "vision-1",
    title: "Lead with Authentic Leadership",
    category: "Career",
    userNotes:
      "I want to inspire teams through genuine connection and empathy, creating environments where everyone can thrive authentically.",
    createdAt: "2023-12-01T08:00:00Z",
    linkedStage: 3,
    position: 0,
  },
  {
    id: "vision-2",
    title: "Nurture Deep Relationships",
    category: "Relationships",
    userNotes:
      "Building meaningful connections based on vulnerability, trust, and mutual growth. Quality over quantity in all relationships.",
    createdAt: "2023-12-02T10:30:00Z",
    linkedStage: 2,
    position: 1,
  },
  {
    id: "vision-3",
    title: "Embody Holistic Wellness",
    category: "Health",
    userNotes:
      "Integrating physical, mental, and spiritual health practices. Daily meditation, regular exercise, and mindful nutrition.",
    createdAt: "2023-12-03T14:15:00Z",
    linkedStage: 1,
    position: 2,
  },
  {
    id: "vision-4",
    title: "Create Lasting Impact",
    category: "Legacy",
    userNotes:
      "Mentoring others on their transformation journey and contributing to positive change in my community.",
    createdAt: "2023-12-04T16:45:00Z",
    linkedStage: 5,
    position: 3,
  },
];

// Provider Component
function FutureBoardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FutureBoardState>({
    visionItems: MOCK_VISION_ITEMS,
    viewMode: "vision",
    selectedCategory: null,
    isEditing: false,
    stageProgress: {
      1: 100,
      2: 75,
      3: 25,
      4: 0,
      5: 0,
    },
    isAutoSaving: false,
  });

  // Load stage progress from stage-tracks-data
  useEffect(() => {
    const progressMap = STAGE_TRACKS_DATA.reduce(
      (acc, stage) => {
        acc[stage.stageNumber] = stage.progress;
        return acc;
      },
      {} as Record<number, number>
    );

    setState((prev) => ({ ...prev, stageProgress: progressMap }));
  }, []);

  // Autosave functionality
  const autosave = useCallback(
    debounce((items: VisionItem[]) => {
      setState((prev) => ({ ...prev, isAutoSaving: true }));

      // Simulate API call
      setTimeout(() => {
        console.log("Autosaved vision items:", items);
        setState((prev) => ({ ...prev, isAutoSaving: false }));
      }, 1000);
    }, 300),
    []
  );

  const updateVisionItems = useCallback(
    (items: VisionItem[]) => {
      setState((prev) => ({ ...prev, visionItems: items }));
      autosave(items);
    },
    [autosave]
  );

  const setViewMode = useCallback((mode: "vision" | "milestone") => {
    setState((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const setSelectedCategory = useCallback((category: string | null) => {
    setState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const setIsEditing = useCallback((editing: boolean) => {
    setState((prev) => ({ ...prev, isEditing: editing }));
  }, []);

  const addVisionItem = useCallback(
    (item: Omit<VisionItem, "id" | "position" | "createdAt">) => {
      const newItem: VisionItem = {
        ...item,
        id: `vision-${Date.now()}`,
        createdAt: new Date().toISOString(),
        position: state.visionItems.length,
      };

      const updatedItems = [...state.visionItems, newItem];
      updateVisionItems(updatedItems);
    },
    [state.visionItems, updateVisionItems]
  );

  const updateVisionItem = useCallback(
    (id: string, updates: Partial<VisionItem>) => {
      const updatedItems = state.visionItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      updateVisionItems(updatedItems);
    },
    [state.visionItems, updateVisionItems]
  );

  const deleteVisionItem = useCallback(
    (id: string) => {
      const updatedItems = state.visionItems.filter((item) => item.id !== id);
      updateVisionItems(updatedItems);
    },
    [state.visionItems, updateVisionItems]
  );

  const contextValue = {
    state,
    updateVisionItems,
    setViewMode,
    setSelectedCategory,
    setIsEditing,
    addVisionItem,
    updateVisionItem,
    deleteVisionItem,
  };

  return (
    <FutureBoardContext.Provider value={contextValue}>
      {children}
    </FutureBoardContext.Provider>
  );
}

// Custom hook
function useFutureBoard() {
  const context = useContext(FutureBoardContext);
  if (!context) {
    throw new Error("useFutureBoard must be used within FutureBoardProvider");
  }
  return context;
}

// Utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

// Get icon level based on stage progress
function getIconLevel(
  item: VisionItem,
  stageProgress: Record<number, number>
): number {
  if (!item.linkedStage) return 1;
  const progress = stageProgress[item.linkedStage] || 0;
  return Math.min(Math.ceil(progress / 20), 5);
}

// Get category icon and color
function getCategoryConfig(category: VisionItem["category"]) {
  const configs = {
    Career: { icon: "💼", color: "hsl(217, 91%, 60%)" },
    Relationships: { icon: "❤️", color: "hsl(142, 76%, 36%)" },
    Health: { icon: "🌿", color: "hsl(173, 58%, 39%)" },
    Legacy: { icon: "🌟", color: "hsl(43, 96%, 56%)" },
    Other: { icon: "✨", color: "hsl(262, 83%, 58%)" },
  };
  return configs[category];
}

// Vision Card Component
function VisionCard({ item }: { item: VisionItem }) {
  const { state, updateVisionItem, deleteVisionItem } = useFutureBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editNotes, setEditNotes] = useState(item.userNotes);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const categoryConfig = getCategoryConfig(item.category);
  const iconLevel = getIconLevel(item, state.stageProgress);
  const stageData = item.linkedStage
    ? STAGE_TRACKS_DATA.find((s) => s.stageNumber === item.linkedStage)
    : null;

  const handleSave = () => {
    updateVisionItem(item.id, {
      title: editTitle,
      userNotes: editNotes,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(item.title);
    setEditNotes(item.userNotes);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border-2 transition-all duration-200 ${
        isDragging ? "shadow-lg scale-105" : "hover:shadow-md"
      }`}
      {...attributes}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl relative"
              style={{ backgroundColor: `${categoryConfig.color}15` }}
            >
              {categoryConfig.icon}
              {iconLevel > 1 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {iconLevel}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${categoryConfig.color}20`,
                    color: categoryConfig.color,
                  }}
                >
                  {item.category}
                </span>
                {stageData && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    Stage {item.linkedStage}
                  </span>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-lg font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <h3 className="text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              {...listeners}
              className="p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              title="Drag to reorder"
            >
              <GripVerticalIcon size={16} />
            </button>

            {state.isEditing && (
              <>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      title="Save changes"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit vision"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => deleteVisionItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete vision"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {isEditing ? (
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
              placeholder="Describe your vision..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{item.userNotes}</p>
          )}

          {/* Stage Progress */}
          {stageData && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{stageData.title}</span>
                  <span>{stageData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${stageData.progress}%`,
                      backgroundColor: stageData.color,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Vision Toolbar Component
function VisionToolbar() {
  const {
    state,
    setViewMode,
    setSelectedCategory,
    setIsEditing,
    addVisionItem,
  } = useFutureBoard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVision, setNewVision] = useState({
    title: "",
    category: "Other" as VisionItem["category"],
    userNotes: "",
    linkedStage: undefined as number | undefined,
  });

  const categories = [
    "All",
    "Career",
    "Relationships",
    "Health",
    "Legacy",
    "Other",
  ];

  const handleAddVision = () => {
    if (newVision.title && newVision.userNotes) {
      addVisionItem({
        title: newVision.title,
        category: newVision.category,
        userNotes: newVision.userNotes,
        linkedStage: newVision.linkedStage as 1 | 2 | 3 | 4 | 5 | undefined,
      });

      setNewVision({
        title: "",
        category: "Other",
        userNotes: "",
        linkedStage: undefined,
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - View controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("vision")}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  state.viewMode === "vision"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <GridIcon size={16} />
                Vision
              </button>
              <button
                onClick={() => setViewMode("milestone")}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  state.viewMode === "milestone"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <TargetIcon size={16} />
                Milestone
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "All" ? null : category)
                  }
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    (category === "All" && !state.selectedCategory) ||
                    state.selectedCategory === category
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {state.isAutoSaving && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                Saving...
              </div>
            )}

            <button
              onClick={() => setIsEditing(!state.isEditing)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                state.isEditing
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {state.isEditing ? "Exit Edit" : "Edit Mode"}
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon size={16} />
              Add Vision
            </button>
          </div>
        </div>

        {/* Add Vision Form */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Title
                </label>
                <input
                  type="text"
                  value={newVision.title}
                  onChange={(e) =>
                    setNewVision((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your vision title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newVision.category}
                  onChange={(e) =>
                    setNewVision((prev) => ({
                      ...prev,
                      category: e.target.value as VisionItem["category"],
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="Career">Career</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Health">Health</option>
                  <option value="Legacy">Legacy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Description
                </label>
                <textarea
                  value={newVision.userNotes}
                  onChange={(e) =>
                    setNewVision((prev) => ({
                      ...prev,
                      userNotes: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe your vision in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Linked Stage (Optional)
                </label>
                <select
                  value={newVision.linkedStage || ""}
                  onChange={(e) =>
                    setNewVision((prev) => ({
                      ...prev,
                      linkedStage: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">No stage linked</option>
                  {STAGE_TRACKS_DATA.map((stage) => (
                    <option key={stage.id} value={stage.stageNumber}>
                      Stage {stage.stageNumber}: {stage.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVision}
                disabled={!newVision.title || !newVision.userNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Vision
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Vision Grid Component
function VisionGrid() {
  const { state, updateVisionItems } = useFutureBoard();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredItems = state.visionItems.filter(
    (item) =>
      !state.selectedCategory || item.category === state.selectedCategory
  );

  const sortedItems = [...filteredItems].sort(
    (a, b) => a.position - b.position
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
      const newIndex = sortedItems.findIndex((item) => item.id === over?.id);

      const reorderedItems = arrayMove(sortedItems, oldIndex, newIndex);

      // Update positions
      const updatedItems = reorderedItems.map((item, index) => ({
        ...item,
        position: index,
      }));

      // Merge with non-filtered items
      const allItems = state.visionItems.map((item) => {
        const updatedItem = updatedItems.find(
          (updated) => updated.id === item.id
        );
        return updatedItem || item;
      });

      updateVisionItems(allItems);
    }
  };

  if (sortedItems.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <TargetIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No visions yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start building your future-self board by adding your first vision.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedItems}
            strategy={verticalListSortingStrategy}
          >
            <div
              className={`grid gap-6 ${
                state.viewMode === "vision"
                  ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {sortedItems.map((item) => (
                <VisionCard key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

// Main Page Component
export default function FutureBoardPage() {
  return (
    <FutureBoardProvider>
      <GradientBackground variant="blue">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-4">
                  <Link
                    to="/stage-tracks"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ← Back to Stages
                  </Link>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      Future Board
                    </h1>
                    <p className="text-sm text-gray-500">
                      Interactive vision planning
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                    title="Export & Share"
                  >
                    <ShareIcon size={20} />
                  </button>

                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                    title="Board Settings"
                  >
                    <SettingsIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <VisionToolbar />

          {/* Main Content */}
          <VisionGrid />
        </div>
      </GradientBackground>
    </FutureBoardProvider>
  );
}
