const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@threehills.com',
    password: 'ThreeHills2024!',
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("User created successfully:", data.user?.email);
    console.log("Please check your email to confirm, OR since this is development, we might need to disable email confirmation in Supabase dashboard if you can't access that email.");
    console.log("But for now, the user exists!");
  }
}

createAdmin();
