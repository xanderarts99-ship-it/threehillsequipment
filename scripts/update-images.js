require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImages() {
  console.log("Updating images...");
  
  const updates = [
    { id: 1, image: '/assets/images/machine-1.webp' },
    { id: 2, image: '/assets/images/machine-2.webp' },
    { id: 3, image: '/assets/images/machine-3.webp' },
    { id: 4, image: '/assets/images/machine-4.webp' },
    { id: 5, image: '/assets/images/machine-1.webp' }, // Reuse 1 for 5
  ];

  for (const item of updates) {
    const { error } = await supabase
      .from('inventory')
      .update({ image: item.image })
      .eq('id', item.id);
      
    if (error) {
        console.error(`Failed to update ID ${item.id}:`, error.message);
    } else {
        console.log(`Updated ID ${item.id} to ${item.image}`);
    }
  }
}

updateImages();
