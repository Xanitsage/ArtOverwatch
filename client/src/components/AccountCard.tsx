import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MoneyAmount from "./MoneyAmount";
import { type Account } from "@shared/schema";

interface AccountCardProps {
  account: Account;
  className?: string;
  onClick?: () => void;
}

export default function AccountCard({ account, className = "", onClick }: AccountCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue_stream":
        return "bg-chart-1/20 text-chart-1";
      case "operating_account":
        return "bg-chart-2/20 text-chart-2";
      case "savings":
        return "bg-chart-3/20 text-chart-3";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "revenue_stream":
        return "Revenue";
      case "operating_account":
        return "Operating";
      case "savings":
        return "Savings";
      default:
        return type;
    }
  };

  return (
    <Card 
      className={`hover-elevate transition-all cursor-pointer ${className}`}
      onClick={onClick}
      data-testid={`account-card-${account.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{account.name}</CardTitle>
          <Badge variant="outline" className={getTypeColor(account.type || "")}>
            {getTypeLabel(account.type || "")}
          </Badge>
        </div>
        {account.description && (
          <p className="text-sm text-muted-foreground">{account.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end justify-between">
          <div>
            <MoneyAmount 
              amount={account.balance || "0"} 
              currency={account.currency}
              size="lg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Available balance
            </p>
          </div>
          <div className={`w-2 h-8 rounded-full ${account.isActive ? "bg-chart-1" : "bg-muted"}`}></div>
        </div>
      </CardContent>
    </Card>
  );
}