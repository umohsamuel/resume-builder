export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
  </div>
);
