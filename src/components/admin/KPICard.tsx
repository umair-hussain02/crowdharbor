import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function KPICard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = '#FD6628' }: KPICardProps) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '18px',
      padding: '22px 24px',
      border: '1px solid #E0E0E0',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#666' }}>{title}</div>
        <div style={{
          width: '34px', height: '34px', borderRadius: '9px',
          background: `${iconColor}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={16} color={iconColor} />
        </div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', marginBottom: '8px' }}>
        {value}
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {changeType === 'up' && <TrendingUp size={13} color="#059669" />}
          {changeType === 'down' && <TrendingDown size={13} color="#DC2626" />}
          <span style={{
            fontSize: '12px', fontWeight: 600,
            color: changeType === 'up' ? '#059669' : changeType === 'down' ? '#DC2626' : '#888',
          }}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
