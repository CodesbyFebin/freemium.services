import type { CollectionEntry } from 'astro:content';

interface CategoryGridProps {
  categories: CollectionEntry<'categories'>[];
  limit?: number;
}

export default function CategoryGrid({ categories, limit }: CategoryGridProps) {
  const displayCategories = limit ? categories.slice(0, limit) : categories;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayCategories.map((category) => (
        <a
          key={category.id}
          href={`/categories/${category.slug}/`}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="flex items-center mb-2">
            {category.data.icon && (
              <span className="text-2xl mr-2">{category.data.icon}</span>
            )}
            <h3 className="text-xl font-bold text-gray-900">{category.data.name}</h3>
          </div>
          
          {category.data.description && (
            <p className="text-gray-600 mb-3 text-sm">
              {category.data.description}
            </p>
          )}
          
          <div className="text-sm text-gray-500">
            {category.data.toolCount} tools in this category
          </div>
        </a>
      ))}
    </div>
  );
}