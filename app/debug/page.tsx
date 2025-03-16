"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthDebugger() {
  const [debug, setDebug] = useState<any>({ loading: true });

  useEffect(() => {
    const runDiagnostics = async () => {
      const results: any = { loading: false };

      try {
        // Step 1: Check if we have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        results.session = {
          exists: !!sessionData.session,
          error: sessionError?.message,
        };

        if (sessionData.session) {
          results.user = {
            id: sessionData.session.user.id,
            email: sessionData.session.user.email,
          };

          // Step 2: List all tables
          const { data: tableData, error: tableError } = await supabase
            .from('admin')
            .select('*');
          
          results.adminTable = {
            data: tableData,
            error: tableError?.message,
            count: tableData?.length || 0,
          };

          // Step 3: Check specific admin lookup
          const { data: adminData, error: adminError } = await supabase
            .from('admin')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();

          results.adminLookup = {
            data: adminData,
            error: adminError?.message,
            found: !!adminData,
          };
        }
      } catch (e) {
        results.error = e.message;
      }

      setDebug(results);
    };

    runDiagnostics();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debugger</h1>
      
      {debug.loading ? (
        <p>Loading diagnostics...</p>
      ) : (
        <div>
          <div className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
            {debug.session?.exists ? (
              <p className="text-green-600">✓ You are authenticated</p>
            ) : (
              <p className="text-red-600">✗ You are not authenticated</p>
            )}
            {debug.session?.error && (
              <p className="text-red-600">Error: {debug.session.error}</p>
            )}
          </div>

          {debug.user && (
            <div className="mb-6 bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">User Info</h2>
              <p><strong>ID:</strong> {debug.user.id}</p>
              <p><strong>Email:</strong> {debug.user.email}</p>
            </div>
          )}

          {debug.adminTable && (
            <div className="mb-6 bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Admin Table Data</h2>
              <p>Found {debug.adminTable.count} records in the admin table</p>
              {debug.adminTable.error && (
                <p className="text-red-600">Error accessing admin table: {debug.adminTable.error}</p>
              )}
              {debug.adminTable.data && debug.adminTable.data.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-semibold">Admin Records:</h3>
                  <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                    {JSON.stringify(debug.adminTable.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {debug.adminLookup && (
            <div className="mb-6 bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Admin Check</h2>
              {debug.adminLookup.found ? (
                <p className="text-green-600">✓ User is an admin</p>
              ) : (
                <p className="text-red-600">✗ User is not an admin</p>
              )}
              {debug.adminLookup.error && (
                <p className="text-red-600">Error: {debug.adminLookup.error}</p>
              )}
              {debug.adminLookup.data && (
                <div className="mt-2">
                  <h3 className="font-semibold">Admin Data:</h3>
                  <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                    {JSON.stringify(debug.adminLookup.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {debug.error && (
            <div className="bg-red-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p>{debug.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

