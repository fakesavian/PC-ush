import React, { useState } from "react";
import {
  PlusIcon,
  ImageIcon,
  QuoteIcon,
  StickyNoteIcon,
  MoreVerticalIcon,
  TrashIcon,
  EditIcon,
} from "lucide-react";
import { MoodboardAsset } from "@/polymet/data/future-self-board-data";

interface MoodboardGridProps {
  assets: MoodboardAsset[];
  onAddAsset: (type: "image" | "quote" | "note") => void;
  onEditAsset: (assetId: string) => void;
  onDeleteAsset: (assetId: string) => void;
  isEditing?: boolean;
}

interface AssetCardProps {
  asset: MoodboardAsset;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

function AssetCard({ asset, onEdit, onDelete, isEditing }: AssetCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getSizeClasses = () => {
    switch (asset.size) {
      case "small":
        return "col-span-1 row-span-1";
      case "large":
        return "col-span-2 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const renderContent = () => {
    switch (asset.type) {
      case "image":
        return (
          <div className="relative w-full h-full min-h-[120px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={asset.src}
              alt="Moodboard asset"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );

      case "quote":
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg h-full min-h-[120px] flex flex-col justify-center border border-purple-100">
            <QuoteIcon size={16} className="text-purple-400 mb-2" />

            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{asset.text}"
            </p>
          </div>
        );

      case "note":
        return (
          <div className="bg-yellow-50 p-4 rounded-lg h-full min-h-[120px] flex flex-col justify-center border border-yellow-200">
            <StickyNoteIcon size={16} className="text-yellow-600 mb-2" />

            <p className="text-sm text-gray-700 leading-relaxed">
              {asset.text}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative group ${getSizeClasses()}`}>
      {renderContent()}

      {/* Menu Button */}
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <MoreVerticalIcon size={14} className="text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <EditIcon size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <TrashIcon size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Creation Date */}
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">
          {new Date(asset.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default function MoodboardGrid({
  assets,
  onAddAsset,
  onEditAsset,
  onDeleteAsset,
  isEditing = false,
}: MoodboardGridProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addOptions = [
    {
      type: "image" as const,
      label: "Add Image",
      icon: ImageIcon,
      color: "text-blue-600",
    },
    {
      type: "quote" as const,
      label: "Add Quote",
      icon: QuoteIcon,
      color: "text-purple-600",
    },
    {
      type: "note" as const,
      label: "Add Note",
      icon: StickyNoteIcon,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Vision Moodboard</h3>
        <span className="text-sm text-gray-500">{assets.length} items</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 auto-rows-min">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onEdit={() => onEditAsset(asset.id)}
            onDelete={() => onDeleteAsset(asset.id)}
            isEditing={isEditing}
          />
        ))}

        {/* Empty state or add button */}
        {assets.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon size={24} className="text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Create Your Vision Board
            </h4>
            <p className="text-sm text-gray-500 mb-4 max-w-sm">
              Add images, quotes, and notes that represent your future self and
              inspire your transformation.
            </p>
            <button
              onClick={() => setShowAddMenu(true)}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : null}
      </div>

      {/* Floating Add Button */}
      {assets.length > 0 && (
        <div className="fixed bottom-6 right-6 z-20">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-200 flex items-center justify-center hover:scale-105"
          >
            <PlusIcon size={24} />
          </button>

          {showAddMenu && (
            <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]">
              {addOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    onAddAsset(option.type);
                    setShowAddMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <option.icon size={18} className={option.color} />

                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
