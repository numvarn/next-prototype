const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database backup with Prisma...');

  const backupDir = path.join(__dirname, '..', 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `db_backup_${timestamp}.json`);

  try {
    // Fetch all records
    console.log('Fetching Users...');
    const users = await prisma.user.findMany();
    
    console.log('Fetching Profiles...');
    const profiles = await prisma.profile.findMany();
    
    console.log('Fetching ActivityLogs...');
    const activityLogs = await prisma.activityLog.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      data: {
        users,
        profiles,
        activityLogs,
      }
    };

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Backup completed successfully!`);
    console.log(`Destination: ${backupFile}`);

  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
