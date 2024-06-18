import { useAuth } from 'react-oidc-context';

export function useGuardRole(role: string): boolean {
    const auth = useAuth();

    const groups = (auth.user?.profile.groups as string[]) ?? [];

    const roleFinded = groups.find((e) => e === role);

    return !!roleFinded;
}
