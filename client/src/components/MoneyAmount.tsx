interface MoneyAmountProps {
  amount: string | number;
  currency?: string;
  className?: string;
  showSign?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function MoneyAmount({ 
  amount, 
  currency = "ZAR", 
  className = "",
  showSign = false,
  size = "md"
}: MoneyAmountProps) {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const isNegative = numericAmount < 0;
  const absoluteAmount = Math.abs(numericAmount);
  
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg font-semibold";
      default:
        return "text-base";
    }
  };

  const getColorClasses = () => {
    if (!showSign) return "";
    if (isNegative) return "text-destructive";
    if (numericAmount > 0) return "text-green-500";
    return "";
  };

  return (
    <span className={`font-mono tabular-nums ${getSizeClasses()} ${getColorClasses()} ${className}`}>
      {showSign && numericAmount > 0 && "+"}
      {formatAmount(isNegative ? -absoluteAmount : absoluteAmount)}
    </span>
  );
}