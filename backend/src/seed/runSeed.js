/**
 * Master seed runner
 *
 * Usage:  node src/seed/runSeed.js
 *
 * What it does:
 *  1. Connects to MongoDB
 *  2. Ensures an admin user exists (admin@growstack.com / admin123)
 *  3. Ensures the 4 Programs exist (Python / Java / Web / AI)
 *  4. For the Python program, creates a Course and seeds 30 DayModules
 *     (Days 1-3 are full GFG-style content; Days 4-30 are skeletons
 *     you can flesh out later)
 *  5. Prints a summary
 *
 * Safe to re-run: it upserts by (program, domain) and (courseId, dayNumber).
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import connectDB from '../config/db.js';
import { Program, Course, DayModule } from '../models/Program.js';
import User from '../models/User.js';

import day1 from './day01.js';
import day2 from './day02.js';
import day3 from './day03.js';
import { buildDayModule } from './daysSkeleton.js';

const PROGRAMS = [
  { name: 'Python Backend Development', domain: 'Python', price: 4999, capacity: 100, description: '30 days of Python — from variables to FastAPI and packaging.', durationDays: 30 },
  { name: 'Enterprise Java Spring Boot', domain: 'Java', price: 5999, capacity: 50, description: '30 days of Java + Spring Boot.', durationDays: 30 },
  { name: 'MERN Stack Fullstack', domain: 'Web', price: 6999, capacity: 150, description: '30 days of MongoDB, Express, React, Node.', durationDays: 30 },
  { name: 'Applied AI & ML', domain: 'AI', price: 7999, capacity: 100, description: '30 days of applied machine learning.', durationDays: 30 },
];

async function ensureAdmin() {
  const adminEmail = 'admin@growstack.com';
  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log(`  ✓ Admin user exists: ${adminEmail}`);
    return existing;
  }
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = await User.create({
    name: 'GrowStack Admin',
    email: adminEmail,
    password: hashed,
    role: 'admin',
  });
  console.log(`  ✓ Admin user created: ${adminEmail} / admin123`);
  return admin;
}

async function ensurePrograms() {
  const results = {};
  for (const p of PROGRAMS) {
    const program = await Program.findOneAndUpdate(
      { domain: p.domain },
      { $set: { ...p, isActive: true } },
      { upsert: true, new: true }
    );
    results[p.domain] = program;
    console.log(`  ✓ Program: ${p.name}`);
  }
  return results;
}

async function seedPythonCurriculum() {
  console.log('\nSeeding Python curriculum (30 days)...');

  const python = await Program.findOne({ domain: 'Python' });
  if (!python) throw new Error('Python program not found');

  let course = await Course.findOne({ programId: python._id });
  if (!course) {
    course = await Course.create({
      programId: python._id,
      totalDays: 30,
      description: '30-day Python application development track.',
    });
    console.log(`  ✓ Created course: ${course._id}`);
  } else {
    console.log(`  ✓ Course exists: ${course._id}`);
  }

  // Full-content days
  const fullDays = { 1: day1, 2: day2, 3: day3 };

  for (let n = 1; n <= 30; n++) {
    const payload = fullDays[n]
      ? { ...fullDays[n], courseId: course._id }
      : { ...buildDayModule(n, course._id) };

    const updated = await DayModule.findOneAndUpdate(
      { courseId: course._id, dayNumber: n },
      { $set: payload },
      { upsert: true, new: true }
    );
    const status = n <= 3 ? '📘 full' : '📄 skeleton';
    console.log(`    Day ${String(n).padStart(2, '0')}: ${updated.title.padEnd(45)} [${status}]`);
  }

  console.log(`\n✅ Seeded 30 DayModules for Python track.`);
  return { python, course };
}

async function main() {
  console.log('🚀 GrowStack seed starting...\n');
  await connectDB();

  await ensureAdmin();
  console.log('\nPrograms:');
  await ensurePrograms();

  await seedPythonCurriculum();

  console.log('\n✅ Seed complete.');
  console.log('\nLogin credentials:');
  console.log('  Admin:  admin@growstack.com / admin123');
  console.log('  Student: register a new account at /register on the frontend\n');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
