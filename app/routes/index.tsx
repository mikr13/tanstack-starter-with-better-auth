import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleToggle from '@/components/LocaleToggle';
import { Button } from '@/components/ui/button';
import { useAuthQuery, useSignOutMutation } from '@/services/auth';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';

const HeroHeader: FC = () => {
  const { data: auth } = useAuthQuery();
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync: signOut } = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      if (!auth?.isAuthenticated) return;
      
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
          {auth?.isAuthenticated ? (
            <Button variant="outline" onClick={handleSignOut}>
              {t('Auth.logout.signOut')}
            </Button>
          ) : (
            <Button asChild variant="link">
              <Link to="/auth/login">{t('Auth.login.signIn')}</Link>
            </Button>
          )}
          <ThemeToggle />
          <LocaleToggle />
        </div>
        <div className='my-4'>{t('Home.title', `Welcome to TanStack starter!`)}</div>
        <small>BetterAuth Debug:</small>
        <div className="p-2 border bg-card rounded-md shadow-sm w-[512px]">
          <pre className="text-wrap">{JSON.stringify(auth, null, 2)}</pre>
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
