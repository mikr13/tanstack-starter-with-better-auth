import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from '@/services/auth';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import type { FC } from 'react';
import { toast } from 'sonner';

const HeroHeader: FC = () => {
  // @ts-expect-error - `auth` is defined in the global scope
  const { data, isPending, error } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      if (!data?.session) return;

      const signOutPromise = signOut(undefined);

      toast.promise(signOutPromise, {
        loading: 'Signing out...',
        success: 'Signed out successfully',
        error: 'Failed to sign out',
      });

      await signOutPromise;

      // Refresh the page to clear the auth state
      router.invalidate();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-y-8 items-center mt-[8rem] z-10 h-[25vh] mb-12 md:-mb-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-4 justify-between">
          {data?.session ? (
            <>
              <Button variant="outline" onClick={handleSignOut}>
                Sign out
              </Button>
              <Button asChild variant="default">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="link">
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
        <div className='my-4'>Welcome to TanStack starter!</div>
        <small>BetterAuth Debug:</small>
        <div className="p-2 border bg-card rounded-md shadow-sm w-[512px]">
          <pre className="text-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

function Home() {
  return <HeroHeader />;
}

export const Route = createFileRoute('/')({
  component: Home,
});
