export interface WisdomArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

export const WISDOM_ARTICLES: WisdomArticle[] = [
  {
    id: "1",
    title: "The Power of Small Steps",
    description:
      "How tiny daily actions lead to remarkable transformations over time.",
    content: `
# The Power of Small Steps

We often underestimate the impact of making small improvements on a daily basis. Too frequently, we convince ourselves that massive success requires massive action. Whether it's losing weight, building a business, writing a book, or achieving any other goal, we put pressure on ourselves to make some earth-shattering improvement that everyone will notice.

## The Mathematics of Progress

If you can get just 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. This isn't just motivational philosophy—it's mathematics.

1.01^365 = 37.78

Meanwhile, if you get 1 percent worse each day for one year, you'll decline nearly down to zero.

0.99^365 = 0.03

What starts as a small win or a minor setback accumulates into something much more.

## Habits Are the Compound Interest of Self-Improvement

Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous.

## The Plateau of Latent Potential

Too often, we convince ourselves that massive success requires massive action. We put pressure on ourselves to make some earth-shattering improvement that everyone will notice.

Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding.

## Forget About Goals, Focus on Systems Instead

Goals are about the results you want to achieve. Systems are about the processes that lead to those results.

- If you're a coach, your goal might be to win a championship. Your system is the way you recruit players, manage your assistant coaches, and conduct practice.
- If you're an entrepreneur, your goal might be to build a million-dollar business. Your system is how you test product ideas, hire employees, and run marketing campaigns.

Goals are good for setting a direction, but systems are best for making progress.

## Remember This

Success is the product of daily habits—not once-in-a-lifetime transformations.

You should be far more concerned with your current trajectory than with your current results. Your outcomes are a lagging measure of your habits. Your net worth is a lagging measure of your financial habits. Your weight is a lagging measure of your eating habits. Your knowledge is a lagging measure of your learning habits. Your clutter is a lagging measure of your cleaning habits.

Time magnifies the margin between success and failure. It will multiply whatever you feed it. Good habits make time your ally. Bad habits make time your enemy.
    `,
    author: {
      name: "James Clear",
      role: "Author & Habits Expert",
      avatar: "https://github.com/polymet-ai.png",
      bio: "James Clear is the author of the #1 New York Times bestseller Atomic Habits. His work has been featured in Entrepreneur magazine, Time magazine, the New York Times, and on CBS This Morning.",
    },
    publishedAt: "2023-06-15",
    readTime: "5 min",
    category: "Habits",
    imageUrl: "https://picsum.photos/seed/habits123/800/600",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Finding Calm in Chaos",
    description:
      "Practical mindfulness techniques to center yourself during stressful times.",
    content: `
# Finding Calm in Chaos

In today's fast-paced world, finding moments of calm amidst the chaos can seem impossible. Yet, the ability to center yourself during stressful times is perhaps one of the most valuable skills you can develop.

## The Nature of Chaos

Chaos is inevitable. Life will always have its ups and downs, its unexpected turns and challenges. The key is not to eliminate chaos—that's impossible—but to find your center within it.

## The Breath as Anchor

Your breath is always with you, making it the perfect anchor during turbulent times. When you feel overwhelmed:

1. **Pause** whatever you're doing
2. **Take** a deep breath in through your nose for 4 counts
3. **Hold** for 2 counts
4. **Release** slowly through your mouth for 6 counts
5. **Repeat** 3-5 times

This simple practice activates your parasympathetic nervous system—your body's natural calming mechanism.

## The 5-4-3-2-1 Grounding Technique

When anxiety threatens to pull you away from the present moment, try this:

- **5 things you can SEE**
- **4 things you can TOUCH**
- **3 things you can HEAR**
- **2 things you can SMELL**
- **1 thing you can TASTE**

This technique gently brings you back to your senses, anchoring you in the present moment.

## Creating Micro-Moments of Calm

You don't need an hour-long meditation session to find calm. Micro-moments throughout your day can be just as effective:

- Take three conscious breaths before checking your phone in the morning
- Feel your feet on the ground while waiting in line
- Savor the warmth and aroma of your tea or coffee
- Pause to look at the sky before entering a building

## The Power of Acceptance

Often, our suffering comes not from the chaos itself, but from our resistance to it. By accepting what is—even if you don't like it—you create space for clarity and wise action.

## Remember This

Calm isn't the absence of a storm. It's finding peace within the storm.

The next time you feel overwhelmed, remember that your center is always there—sometimes it just takes a moment of conscious attention to find it again.
    `,
    author: {
      name: "Dr. Sarah Johnson",
      role: "Mindfulness Coach",
      avatar: "https://github.com/denizbuyuktas.png",
      bio: "Dr. Sarah Johnson has been teaching mindfulness techniques for over 15 years. She combines Eastern wisdom with Western psychology to create practical approaches to finding peace in everyday life.",
    },
    publishedAt: "2023-07-22",
    readTime: "4 min",
    category: "Mindfulness",
    imageUrl: "https://picsum.photos/seed/mindful456/800/600",
  },
  {
    id: "3",
    title: "The Courage to Be Vulnerable",
    description:
      "Why opening yourself up to vulnerability is the key to deeper connections.",
    content: `
# The Courage to Be Vulnerable

Vulnerability is not winning or losing; it's having the courage to show up and be seen when we have no control over the outcome.

## The Myth of Vulnerability as Weakness

Many of us have been taught that vulnerability is weakness. We've learned to guard ourselves, to build walls, to never let others see our struggles. But what if this approach is actually holding us back from the very things we desire most—connection, belonging, and love?

## What Vulnerability Really Is

Vulnerability is:
- Telling someone you love them first
- Asking for help when you need it
- Sharing your ideas even when they might be rejected
- Admitting you made a mistake
- Trying something new where you might fail

It's showing up with your whole heart, even when there are no guarantees.

## The Paradox of Vulnerability

Here's the paradox: vulnerability feels like weakness, but it's actually our greatest measure of courage.

Think about it—when you witness someone else being genuinely vulnerable, do you think they're weak? Usually, it's quite the opposite. We're moved by others' vulnerability. We connect with it. We respect the courage it takes.

## The Price of Emotional Armor

When we shut down vulnerability, we:
- Numb joy along with pain
- Diminish our capacity for connection
- Lose our ability to be fully present
- Sacrifice authenticity for safety

The armor that we think is protecting us is actually weighing us down.

## Starting Small with Vulnerability

You don't need to bare your soul to everyone you meet. Start small:
- Share an honest opinion in a meeting
- Ask for help with something minor
- Admit when you don't know something
- Express gratitude specifically and personally

## Remember This

Vulnerability is not about winning or losing. It's about having the courage to show up when you can't control the outcome.

The willingness to be vulnerable isn't about being perfect or always getting it right. It's about being human, with all the messiness that entails. And in that messiness, we find our most meaningful connections.
    `,
    author: {
      name: "Michael Chen",
      role: "Relationship Coach",
      avatar: "https://github.com/furkanksl.png",
      bio: "Michael Chen specializes in helping people build deeper, more authentic relationships. His approach combines psychological research with practical communication strategies.",
    },
    publishedAt: "2023-08-05",
    readTime: "6 min",
    category: "Relationships",
    imageUrl: "https://picsum.photos/seed/vulnerable789/800/600",
  },
  {
    id: "4",
    title: "Embracing the Growth Mindset",
    description:
      "How believing in your ability to grow can transform your potential.",
    content: `
# Embracing the Growth Mindset

Your beliefs about yourself can determine your reality. When you believe your qualities are fixed—that you either "have it" or you don't—you have what psychologists call a "fixed mindset." But when you understand that abilities can be developed through dedication and hard work, you have a "growth mindset." This view creates a love of learning and a resilience essential for great accomplishment.

## Fixed vs. Growth Mindset

**Fixed Mindset:**
- Believes intelligence and talent are static
- Avoids challenges to avoid failure
- Gives up easily when obstacles arise
- Sees effort as fruitless
- Ignores useful negative feedback
- Feels threatened by others' success

**Growth Mindset:**
- Believes intelligence and talent can be developed
- Embraces challenges as opportunities
- Persists in the face of setbacks
- Sees effort as the path to mastery
- Learns from criticism
- Finds lessons and inspiration in others' success

## The Power of "Yet"

One simple word can transform how you view challenges: "yet."

"I don't understand this" becomes "I don't understand this yet."
"I can't do this" becomes "I can't do this yet."

This small shift acknowledges that you're on a learning curve—not at a dead end.

## Developing a Growth Mindset

1. **Recognize your fixed mindset voice.** Notice when you're being judgmental about your abilities.

2. **Respond with a growth mindset perspective.** Challenge those fixed thoughts with alternatives: "I can learn to do this" or "Mistakes help me improve."

3. **Take growth mindset actions.** Choose the path that leads to growth, even when it's harder.

4. **Celebrate the process, not just the outcome.** Acknowledge your efforts, strategies, and progress, not just achievements.

## The Neuroscience of Growth

Every time you push out of your comfort zone to learn something new, your brain forms new neural connections. The more you challenge yourself, the stronger and more numerous these connections become.

You are literally growing your brain when you embrace challenges and persist through difficulties.

## Remember This

Your potential is not predetermined. It's something you cultivate through effort, strategies, and help from others.

The question is not "How smart am I?" but rather "How can I become smarter?" This shift in perspective—from proving yourself to improving yourself—changes everything.
    `,
    author: {
      name: "Dr. Carol Dweck",
      role: "Psychologist & Researcher",
      avatar: "https://github.com/yahyabedirhan.png",
      bio: "Dr. Carol Dweck is a renowned psychologist whose work on mindset has transformed our understanding of motivation, achievement, and success.",
    },
    publishedAt: "2023-09-12",
    readTime: "7 min",
    category: "Psychology",
    imageUrl: "https://picsum.photos/seed/growth101/800/600",
    isFeatured: true,
  },
  {
    id: "5",
    title: "The Art of Saying No",
    description: "Setting healthy boundaries to protect your time and energy.",
    content: `
# The Art of Saying No

In a world that constantly demands our attention, energy, and time, learning to say "no" is not just a skill—it's an art form essential for well-being and effectiveness.

## Why Saying No Is Hard

Many of us struggle with saying no because:
- We fear disappointing others
- We want to be seen as helpful and capable
- We worry about damaging relationships
- We suffer from FOMO (fear of missing out)
- We've been conditioned to be agreeable

But every time you say yes to something, you're implicitly saying no to something else—often your own priorities, rest, or well-being.

## The Hidden Cost of Always Saying Yes

When you consistently prioritize others' needs over your own:
- Your own goals get neglected
- Your energy becomes depleted
- Resentment builds up
- The quality of your work suffers
- Your self-respect diminishes

## How to Say No Gracefully

1. **Be clear and direct.** Ambiguity leaves room for misunderstanding.
   - "I'm not able to take that on right now."

2. **Keep it simple.** You don't need to over-explain or justify.
   - "Thank you for thinking of me, but I need to decline."

3. **Offer an alternative if appropriate.**
   - "I can't do the full project, but I could review the final draft."
   - "I'm not available, but I know someone who might be interested."

4. **Delay if you need time to decide.**
   - "Let me check my schedule and get back to you tomorrow."

5. **Use the "positive no" formula:** Yes-No-Yes
   - "I appreciate you thinking of me (yes), but I won't be able to attend (no). I'd love to catch up another time (yes)."

## Setting Boundaries Is Self-Respect

Remember that setting boundaries isn't selfish—it's necessary. By protecting your time and energy, you ensure that when you do say yes, you can fully commit and bring your best self.

## Remember This

Your time and energy are your most precious resources. Being selective about how you spend them isn't just practical—it's essential for living a purposeful life aligned with your values.

The next time you feel pressured to say yes, pause and ask yourself: "If I say yes to this, what am I saying no to?"
    `,
    author: {
      name: "Alex Rivera",
      role: "Productivity Coach",
      avatar: "https://github.com/kdrnp.png",
      bio: "Alex Rivera helps busy professionals reclaim their time and energy through strategic boundary-setting and priority management.",
    },
    publishedAt: "2023-10-08",
    readTime: "5 min",
    category: "Productivity",
    imageUrl: "https://picsum.photos/seed/boundaries202/800/600",
  },
  {
    id: "6",
    title: "Finding Your Purpose",
    description:
      "A guide to discovering what truly matters to you and living accordingly.",
    content: `
# Finding Your Purpose

Purpose isn't something you suddenly discover one day—it's something you uncover gradually through living intentionally and paying attention to what resonates deeply with you.

## The Misconception of Purpose

Many people believe that purpose is:
- A single, clear calling
- Something you're born knowing
- A dramatic revelation
- Always tied to career or achievement

In reality, purpose is often:
- Multifaceted and evolving
- Discovered through experience
- A quiet knowing rather than a thunderbolt
- Connected to how you want to be, not just what you want to do

## Four Questions to Clarify Purpose

1. **What makes you come alive?**
   When do you feel most energized, engaged, and enthusiastic?

2. **What are your innate strengths?**
   What abilities come naturally to you that you enjoy using?

3. **Where do you add distinctive value?**
   How do you contribute in ways that are meaningful to others?

4. **What cause or issue deeply resonates with you?**
   What problems or conditions move you to want to take action?

## Purpose in the Everyday

Purpose doesn't have to be grand or world-changing. It can be found in:
- How you treat the people in your life
- Small acts of kindness and service
- The quality and intention you bring to your work
- The way you overcome challenges
- How you use your unique perspective and gifts

## The Ikigai Framework

Consider the Japanese concept of Ikigai—the intersection of:
- What you love
- What you're good at
- What the world needs
- What you can be paid for

While all four aren't necessary for purpose, this framework helps identify where meaning might be found in your life.

## Purpose as a Compass, Not a Destination

Think of purpose not as a fixed destination but as a compass that helps you navigate decisions and priorities. It's less about "finding" your purpose once and for all, and more about living purposefully every day.

## Remember This

You don't need to have it all figured out to live with purpose today. Start by bringing more intention to what you're already doing, and pay attention to what gives you a sense of meaning and fulfillment.

Purpose often reveals itself in retrospect—through the patterns of what has mattered to you over time.
    `,
    author: {
      name: "Maya Patel",
      role: "Life Purpose Coach",
      avatar: "https://github.com/yusufhilmi.png",
      bio: "Maya Patel has helped hundreds of people discover their unique purpose through her coaching practice that combines Eastern philosophy with practical Western approaches.",
    },
    publishedAt: "2023-11-20",
    readTime: "8 min",
    category: "Life Purpose",
    imageUrl: "https://picsum.photos/seed/purpose303/800/600",
    isFeatured: true,
  },
];
