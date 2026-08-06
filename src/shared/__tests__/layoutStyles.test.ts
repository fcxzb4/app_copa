import { layoutStyles } from '../presentation/components/layout/layoutStyles';

describe('layoutStyles', () => {
    it('deve exportar o objeto de estilos StyleSheet', () => {
        expect(layoutStyles).toBeDefined();
        expect(typeof layoutStyles).toBe('object');
    });

    it('deve conter as regras principais do layout global', () => {
        const expectedKeys = [
            'safeArea',
            'header',
            'headerContent',
            'brand',
            'hamburgerButton',
            'hamburgerText',
            'title',
            'avatarContainer',
            'avatarEmoji',
            'scrollView',
            'scrollContent',
            'container',
            'bottomNav',
            'navItem',
            'navIcon',
            'navLabel',
            'activeTabCapsule',
            'activeNavIcon',
            'activeNavLabel',
            'footer',
            'footerText',
        ];

        expectedKeys.forEach(key => {
            expect(layoutStyles).toHaveProperty(key);
            expect(layoutStyles[key as keyof typeof layoutStyles]).toBeDefined();
        });
    });

    it('deve possuir as cores da identidade visual do app', () => {
        expect(layoutStyles.safeArea.backgroundColor).toBe('#05110B');
        expect(layoutStyles.header.backgroundColor).toBe('#030A06');
        expect(layoutStyles.title.color).toBe('#4ADE80');
        expect(layoutStyles.activeTabCapsule.backgroundColor).toBe('#FACC15');
        expect(layoutStyles.activeNavIcon.color).toBe('#05110B');
    });
});
