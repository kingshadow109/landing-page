# Contributing to WearX

Thank you for your interest in contributing to WearX! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive in all interactions
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Accept responsibility for mistakes
- Prioritize the community's best interests

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling, insulting comments, or personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct that could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git
- A code editor (VS Code recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Importer
- GitLens

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/wearx.git
cd wearx/projects/landing-page

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

---

## Development Workflow

### Branch Naming Convention

```
feature/description     # New features
fix/description         # Bug fixes
docs/description        # Documentation updates
refactor/description    # Code refactoring
test/description        # Test additions/updates
chore/description       # Maintenance tasks
```

Example: `feature/weather-alerts` or `fix/outfit-scoring-bug`

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Test additions or updates
- `chore`: Build process or auxiliary tool changes

**Examples**:
```
feat(outfits): add weather-based outfit scoring

Implement temperature, precipitation, and UV protection
scoring for outfit recommendations. This improves
recommendations for extreme weather conditions.

Closes #123
```

```
fix(api): handle missing API keys gracefully

Return mock data when GOOGLE_API_KEY is not configured
instead of throwing an error. This improves the
developer experience.

Fixes #456
```

### Development Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

---

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type - use `unknown` with type guards when necessary
- Use type inference where obvious, explicit types for exports

```typescript
// ✅ Good
interface OutfitRecommendation {
  items: ClothingItem[];
  score: number;
  reason: string;
}

function generateOutfit(wardrobe: ClothingItem[]): OutfitRecommendation {
  // Implementation
}

// ❌ Bad
function generateOutfit(items: any): any {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Use named exports for components
- Keep components focused and single-responsibility
- Use React.FC for components with children

```typescript
// ✅ Good
interface OutfitCardProps {
  outfit: Outfit;
  onSelect: (outfit: Outfit) => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onSelect }) => {
  return (
    <div onClick={() => onSelect(outfit)}>
      {/* Component JSX */}
    </div>
  );
};

// ❌ Bad
export default function({ outfit, onSelect }) {
  return <div>{/* Component JSX */}</div>;
}
```

### Styling (Tailwind CSS)

- Use Tailwind's utility classes
- Group related classes with `clsx` or `tailwind-merge`
- Use the `cn()` utility from `lib/utils.ts`
- Avoid arbitrary values when possible

```typescript
// ✅ Good
import { cn } from "@/lib/utils";

<button
  className={cn(
    "px-4 py-2 rounded-lg font-medium",
    "bg-blue-600 text-white hover:bg-blue-700",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  )}
  disabled={isLoading}
>
  {children}
</button>

// ❌ Bad
<button className="px-[16px] py-[8px] rounded-[8px] bg-[#3b82f6]">
  {children}
</button>
```

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (routes)/          # Page routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/
│   ├── utils.ts          # General utilities
│   └── hooks.ts          # Custom React hooks
├── types/
│   └── index.ts          # TypeScript types
└── styles/
    └── globals.css       # Global styles
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names
- **CSS Classes**: kebab-case

### Comments

- Use JSDoc for public functions and components
- Explain "why", not "what" (code should be self-documenting)
- Keep comments up-to-date with code changes

```typescript
/**
 * Calculates the cost-per-wear for a wardrobe item.
 * 
 * CPW = Purchase Price / Times Worn
 * Lower CPW indicates better value.
 * 
 * @param item - The wardrobe item to calculate
 * @returns Cost-per-wear metrics including value category
 */
export function calculateCPW(item: WardrobeItem): CPWMetrics {
  // Implementation
}
```

---

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**:
   ```bash
   npm run lint
   npm run build
   ```
4. **Update CHANGELOG.md** with your changes
5. **Fill out the PR template** completely
6. **Link related issues** using keywords (Fixes #123, Closes #456)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #123
```

### Review Process

- All PRs require at least one review
- Address review feedback promptly
- Keep PRs focused and reasonably sized
- Rebase on main if there are conflicts

---

## Issue Reporting

### Bug Reports

Use the bug report template and include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Numbered steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: OS, browser, Node version
7. **Additional Context**: Any other relevant information

```markdown
**Bug Description**
Outfit recommendations don't account for precipitation

**Steps to Reproduce**
1. Add items to wardrobe
2. Enable weather with rain condition
3. Generate outfits
4. Observe suede items recommended

**Expected Behavior**
Should avoid suede and recommend waterproof materials

**Actual Behavior**
Recommends suede shoes in rainy weather

**Environment**
- OS: macOS 14.2
- Browser: Chrome 120
- Node: 20.10.0
```

### Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email security@wearx.app with details
2. Include reproduction steps
3. Allow time for response before disclosure

---

## Feature Requests

### Suggesting Features

1. Check existing issues first
2. Use the feature request template
3. Describe the use case clearly
4. Explain why it would be valuable
5. Consider implementation approach

```markdown
**Feature Description**
Add outfit scheduling/calendar integration

**Use Case**
As a user, I want to plan outfits for upcoming events
so I can prepare in advance and ensure I have clean clothes.

**Proposed Solution**
- Calendar view in app
- Ability to assign outfits to dates
- Reminder notifications
- Weather forecast integration

**Alternatives Considered**
- External calendar sync (Google/Apple)
- Simple list view instead of calendar

**Additional Context**
Would be especially useful for travel planning
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Use Jest and React Testing Library
- Test component behavior, not implementation
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

```typescript
// ✅ Good
describe('OutfitCard', () => {
  it('should call onSelect when clicked', () => {
    // Arrange
    const onSelect = jest.fn();
    const outfit = createMockOutfit();
    render(<OutfitCard outfit={outfit} onSelect={onSelect} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(onSelect).toHaveBeenCalledWith(outfit);
  });
});
```

---

## Documentation

### Code Documentation

- Document all public APIs
- Include JSDoc for functions
- Keep README.md up-to-date
- Update API_DOCUMENTATION.md for endpoint changes

### User Documentation

- Write clear, concise instructions
- Include screenshots where helpful
- Provide examples
- Keep language simple and accessible

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat (invite link in README)

### Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Added to the "Contributors" section on the website

### Becoming a Maintainer

Regular contributors who demonstrate:
- Quality code contributions
- Helpful code reviews
- Community support
- Alignment with project values

May be invited to become maintainers.

---

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release with notes
6. Deploy to production

---

## Questions?

If you have questions not covered here:

1. Check existing documentation
2. Search closed issues
3. Ask in GitHub Discussions
4. Join our Discord community

---

Thank you for contributing to WearX! 🎉
