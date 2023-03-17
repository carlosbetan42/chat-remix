import { type MetaFunction, type LinksFunction, json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import styles from './styles/global.css';
import { type LoaderArgs } from '@remix-run/node';
import { useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { type Database } from './types/database';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Chat en tiempo Real Remix',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
];

export const loader = async ({}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
  };

  return json({ env });
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();

  // const supabase = useMemo(
  //   () => createClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!),
  //   [env.SUPABASE_URL, env.SUPABASE_ANON_KEY]
  // );
  const [supabase] = useState(() => createClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!));

  return (
    <html lang='es'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
