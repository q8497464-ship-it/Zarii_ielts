/**
 * One-Time Content Migration Script
 * Migrates Reading, Listening, Writing, Speaking, Vocab, and Grammar JSONs into database entities preserving IDs.
 */
import { contentStore } from '../src/shared/content/contentStore';

console.log('🚀 Starting Zarii Content Migration to Database...');

const counts = contentStore.migrateDefaultContent((step) => {
  console.log(` → ${step}`);
});

console.log('✓ Migration Completed Successfully!');
console.log(`  Tests:     ${counts.testsCount}`);
console.log(`  Questions: ${counts.questionsCount}`);
console.log(`  Writing:   ${counts.writingCount}`);
console.log(`  Speaking:  ${counts.speakingCount}`);
console.log(`  Vocab:     ${counts.vocabCount}`);
console.log(`  Grammar:   ${counts.grammarCount}`);
