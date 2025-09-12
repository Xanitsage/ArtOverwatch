import MetricsCard from '../MetricsCard'
import { DollarSign } from 'lucide-react'

export default function MetricsCardExample() {
  return (
    <MetricsCard
      title="Total Revenue"
      value="$45,231"
      change="+20.1% from last month"
      changeType="positive"
      icon={DollarSign}
      description="Revenue from all sources"
    />
  )
}