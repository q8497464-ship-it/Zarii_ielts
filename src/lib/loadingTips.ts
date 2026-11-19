/**
 * Zarii IELTS Preparation - Loading Screen Tips
 * Rotating high-impact study strategies and examiner advice.
 */

export interface LoadingTip {
  id: string;
  category: 'general' | 'listening' | 'reading' | 'writing' | 'speaking';
  text: string;
  urdu?: string;
}

export const LOADING_TIPS: LoadingTip[] = [
  {
    id: 'tip-reading-1',
    category: 'reading',
    text: 'Tip: Skim the passage first, then read the questions.',
    urdu: 'مشورہ: پہلے پیراگراف کا سرسری جائزہ لیں، پھر سوالات پڑھیں۔',
  },
  {
    id: 'tip-general-1',
    category: 'general',
    text: 'Tip: Practise a little every day, small steps add up.',
    urdu: 'مشورہ: روزانہ تھوڑی پریکٹس کریں، چھوٹے قدم بڑا نتیجہ لاتے ہیں۔',
  },
  {
    id: 'tip-writing-1',
    category: 'writing',
    text: 'Tip: In Writing, plan for 5 minutes before you start.',
    urdu: 'مشورہ: رائٹنگ میں شروع کرنے سے پہلے 5 منٹ خاکہ بنائیں۔',
  },
  {
    id: 'tip-speaking-1',
    category: 'speaking',
    text: 'Tip: Speak out loud when you practise, even alone.',
    urdu: 'مشورہ: پریکٹس کے دوران بلند آواز میں بولیں، تنہا بھی ہوں۔',
  },
  {
    id: 'tip-general-2',
    category: 'general',
    text: 'Tip: Review your mistakes, they are your fastest teachers.',
    urdu: 'مشورہ: اپنی غلطیوں کا جائزہ لیں، وہی آپ کے بہترین استاد ہیں۔',
  },
  {
    id: 'tip-listening-1',
    category: 'listening',
    text: 'Tip: Use the 30-second pause in Listening to underline keywords.',
    urdu: 'مشورہ: لسننگ کے 30 سیکنڈ کے وقفے میں اہم الفاظ کو انڈر لائن کریں۔',
  },
  {
    id: 'tip-writing-2',
    category: 'writing',
    text: 'Tip: Task 2 contributes double the marks of Task 1 in Writing.',
    urdu: 'مشورہ: رائٹنگ میں ٹاسک 2 کے نمبر ٹاسک 1 سے دگنے ہوتے ہیں۔',
  },
  {
    id: 'tip-speaking-2',
    category: 'speaking',
    text: 'Tip: In Speaking Part 2, use the 1-minute prep time to note bullet points.',
    urdu: 'مشورہ: اسپیکنگ پارٹ 2 میں 1 منٹ کی تیاری کے دوران اہم نکات لکھیں۔',
  },
];

/**
 * Returns a random tip from the pool, optionally avoiding the previous tip id.
 */
export function getRandomTip(excludeId?: string): LoadingTip {
  const pool = excludeId ? LOADING_TIPS.filter((t) => t.id !== excludeId) : LOADING_TIPS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] || LOADING_TIPS[0];
}

/**
 * Default fallback tips string list for pure HTML/inline contexts.
 */
export const INLINE_LOADING_TIPS = LOADING_TIPS.map((t) => t.text);
