const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@threehills.com',
    password: 'ThreeHills2024!', // Password for testing
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("Success! Confirmation email sent to swankylex@gmail.com.");
    console.log("Please click the link in your email to confirm your account.");
  }
}

createTestUser();
