const fs = require('fs');
const path = require('path');

const units = [
  { num: 1, data: require('./data-a1-u1.cjs') },
  { num: 2, data: require('./data-a1-u2.cjs') },
  { num: 3, data: require('./data-a1-u3.cjs') },
  { num: 4, data: require('./data-a1-u4.cjs') },
  { num: 5, data: require('./data-a1-u5.cjs') },
  { num: 6, data: require('./data-a1-u6.cjs') }
];

const baseDir = path.resolve(__dirname, '../../content/course/a1');

let writtenCount = 0;

for (const u of units) {
  const unitDir = path.join(baseDir, `unit-${u.num}`);
  if (!fs.existsSync(unitDir)) {
    fs.mkdirSync(unitDir, { recursive: true });
  }

  u.data.forEach((lesson, idx) => {
    const lessonFile = path.join(unitDir, `lesson-${idx + 1}.json`);
    fs.writeFileSync(lessonFile, JSON.stringify(lesson, null, 2), 'utf8');
    writtenCount++;
    console.log(`Wrote ${lesson.id} -> ${path.relative(path.resolve(__dirname, '../../'), lessonFile)}`);
  });
}

console.log(`\nSuccessfully wrote ${writtenCount} lesson files for A1 Units 1-6.`);
