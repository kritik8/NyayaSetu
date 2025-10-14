import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Shield,
  IndianRupee,
  FileText,
  Hash
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const notificationsData = [
  {
    id: 1,
    type: 'funds_released',
    title: 'Funds Released',
    message: 'Emergency grant of ₹2,000 has been released to your account via PFMS Ref #PF2025012345',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high',
    claimId: 'NYS-2025-0012',
    icon: IndianRupee,
    color: '#10B981'
  },
  {
    id: 2,
    type: 'verification_complete',
    title: 'Police Verification Complete',
    message: 'Your FIR complaint has been verified by local police. Next step: Emergency grant processing.',
    timestamp: '4 hours ago',
    read: false,
    priority: 'medium',
    claimId: 'NYS-2025-0012',
    icon: Shield,
    color: '#1A73E8'
  },
  {
    id: 3,
    type: 'document_processed',
    title: 'DigiLocker Verification',
    message: 'Your documents have been successfully verified from DigiLocker. No action required.',
    timestamp: '1 day ago',
    read: true,
    priority: 'low',
    claimId: 'NYS-2025-0008',
    icon: FileText,
    color: '#F59E0B'
  },
  {
    id: 4,
    type: 'ml_check',
    title: 'ML Verification Complete',
    message: 'AI analysis completed with 93% confidence. Marriage certificate authenticated.',
    timestamp: '1 day ago',
    read: true,
    priority: 'medium',
    claimId: 'NYS-2025-0008',
    icon: CheckCircle,
    color: '#10B981'
  },
  {
    id: 5,
    type: 'system_update',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Jan 20, 2025 from 12:00 AM to 2:00 AM. Services may be temporarily unavailable.',
    timestamp: '2 days ago',
    read: true,
    priority: 'low',
    claimId: null,
    icon: Info,
    color: '#6B7280'
  },
  {
    id: 6,
    type: 'case_update',
    title: 'Case Update Required',
    message: 'Additional documentation may be required for claim NYS-2025-0003. Please check your case details.',
    timestamp: '3 days ago',
    read: true,
    priority: 'medium',
    claimId: 'NYS-2025-0003',
    icon: AlertCircle,
    color: '#EF4444'
  }
];

const filterTabs = [
  { id: 'all', title: 'All', icon: Bell },
  { id: 'unread', title: 'Unread', icon: Clock },
  { id: 'funds', title: 'Funds', icon: IndianRupee },
  { id: 'updates', title: 'Updates', icon: Info }
];

function NotificationCard({ notification, onPress, onMarkRead }) {
  const Icon = notification.icon;

  const getPriorityBorder = () => {
    if (notification.read) return '#F3F4F6';
    switch (notification.priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#F3F4F6';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: notification.read ? '#FFFFFF' : '#F8FAFC',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: getPriorityBorder(),
        borderLeftWidth: notification.read ? 1 : 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: `${notification.color}15`,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Icon size={20} color={notification.color} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: notification.read ? '500' : '600',
                color: '#111827',
                flex: 1,
              }}
            >
              {notification.title}
            </Text>
            {!notification.read && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: notification.color,
                  marginLeft: 8,
                  marginTop: 4,
                }}
              />
            )}
          </View>

          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            {notification.message}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
              {notification.timestamp}
            </Text>
            
            {notification.claimId && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Hash size={12} color="#6B7280" />
                <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
                  {notification.claimId}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FilterTab({ tab, active, count, onPress }) {
  const Icon = tab.icon;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: active ? '#1A73E8' : '#F3F4F6',
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Icon size={16} color={active ? '#FFFFFF' : '#6B7280'} />
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: active ? '#FFFFFF' : '#6B7280',
          marginLeft: 6,
        }}
      >
        {tab.title}
      </Text>
      {count > 0 && (
        <View
          style={{
            backgroundColor: active ? '#FFFFFF' : '#1A73E8',
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: active ? '#1A73E8' : '#FFFFFF',
            }}
          >
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(notificationsData);

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'funds':
        return notifications.filter(n => n.type === 'funds_released');
      case 'updates':
        return notifications.filter(n => ['verification_complete', 'document_processed', 'ml_check', 'case_update'].includes(n.type));
      default:
        return notifications;
    }
  };

  const getFilterCount = (filterId) => {
    switch (filterId) {
      case 'unread':
        return notifications.filter(n => !n.read).length;
      case 'funds':
        return notifications.filter(n => n.type === 'funds_released').length;
      case 'updates':
        return notifications.filter(n => ['verification_complete', 'document_processed', 'ml_check', 'case_update'].includes(n.type)).length;
      default:
        return notifications.length;
    }
  };

  const handleNotificationPress = (notification) => {
    Haptics.lightAsync();
    
    // Mark as read
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    // Navigate to relevant screen
    if (notification.claimId) {
      router.push(`/claim/${notification.claimId}`);
    }
  };

  const markAllAsRead = () => {
    Haptics.lightAsync();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>
              Notifications
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'You\'re all caught up!'}
            </Text>
          </View>
          
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={markAllAsRead}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {filterTabs.map((tab) => (
            <FilterTab
              key={tab.id}
              tab={tab}
              active={activeFilter === tab.id}
              count={getFilterCount(tab.id)}
              onPress={() => {
                Haptics.lightAsync();
                setActiveFilter(tab.id);
              }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={() => handleNotificationPress(notification)}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 80,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#F3F4F6',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <Bell size={40} color="#9CA3AF" />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              No Notifications
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              You don't have any {activeFilter === 'all' ? '' : activeFilter} notifications yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}