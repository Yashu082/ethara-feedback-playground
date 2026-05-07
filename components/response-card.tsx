import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResponseCardProps {
  modelName: string;
  response: string;
  isSelected?: boolean;
}

export default function ResponseCard({
  modelName,
  response,
  isSelected = false,
}: ResponseCardProps) {
  return (
    <Card
      className={`group flex flex-col gap-5 rounded-lg p-6 transition-all duration-300 ease-out ${
        isSelected
          ? "border-blue-600/50 bg-zinc-900 shadow-lg shadow-blue-600/10 hover:border-blue-600/80 hover:shadow-xl hover:shadow-blue-600/20 hover:bg-zinc-900/95"
          : "border-zinc-700/50 bg-zinc-900/50 shadow-sm shadow-zinc-900/50 hover:border-zinc-600/80 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-zinc-900/80 hover:shadow-blue-500/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
          isSelected
            ? "text-zinc-50 group-hover:text-blue-50"
            : "text-zinc-50 group-hover:text-zinc-100"
        }`}>
          {modelName}
        </h3>
        {isSelected && (
          <Badge className="bg-blue-950 text-blue-300 hover:bg-blue-950 transition-all duration-300 group-hover:bg-blue-900 group-hover:shadow-md group-hover:shadow-blue-600/20">
            Selected
          </Badge>
        )}
      </div>
      <p className={`leading-relaxed text-sm transition-colors duration-300 ${
        isSelected
          ? "text-zinc-300 group-hover:text-zinc-200"
          : "text-zinc-300 group-hover:text-zinc-200"
      }`}>
        {response}
      </p>
    </Card>
  );
}
