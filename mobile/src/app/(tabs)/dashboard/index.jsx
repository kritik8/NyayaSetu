import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  FileText, 
  Heart, 
  Search, 
  MessageCircle, 
  HelpCircle,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const { width: screenWidth } = Dimensions.get("window");

const quickActions = [
  {
    id: 'complaint',
    title: 'File Caste-Discrimination Complaint',
    subtitle: 'Report incidents under PCR & PoA Acts',
    icon: FileText,
    color: '#1A73E8',
    route: '/complaint/1'
  },
  {
    id: 'marriage',
    title: 'Inter-Caste Marriage Incentive',
    subtitle: 'Apply for DBT benefits',
    icon: Heart,
    color: '#10B981',
    route: '/marriage/1'
  },
  {
    id: 'track',
    title: 'Track My Claims',
    subtitle: 'View application status',
    icon: Search,
    color: '#F59E0B',
    route: '/claims'
  },
  {
    id: 'grievance',
    title: 'Raise Grievance',
    subtitle: 'Report issues or concerns',
    icon: MessageCircle,
    color: '#EF4444',
    route: '/grievance'
  },
  {
    id: 'help',
    title: 'Resources & Helpline',
    subtitle: 'Get help and support',
    icon: HelpCircle,
    color: '#8B5CF6',
    route: '/help'
  }
];

const statusData = [
  { label: 'Active Claims', count: 2, icon: Clock, color: '#F59E0B' },
  { label: 'Pending Verifications', count: 1, icon: AlertCircle, color: '#EF4444' },
  { label: 'Emergency Grants', count: 0, icon: Shield, color: '#10B981' },
  { label: 'Completed', count: 3, icon: CheckCircle, color: '#6B7280' }
];

function ActionCard({ action, onPress }) {
  const Icon = action.icon;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: `${action.color}15`,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}
        >
          <Icon size={24} color={action.color} />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 4,
            }}
          >
            {action.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 20,
            }}
          >
            {action.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function StatusChip({ status }) {
  const Icon = status.icon;
  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Icon size={16} color={status.color} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#374151',
          marginLeft: 6,
          marginRight: 4,
        }}
      >
        {status.label}
      </Text>
      <View
        style={{
          backgroundColor: status.color,
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#FFFFFF',
          }}
        >
          {status.count}
        </Text>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleActionPress = (action) => {
    Haptics.lightAsync();
    router.push(action.route);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#1A73E8',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
              न्या
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
              Welcome, Suman Devi
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Bridge to Justice
            </Text>
          </View>
        </View>

        {/* Status Overview */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {statusData.map((status, index) => (
            <StatusChip key={index} status={status} />
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 20,
          }}
        >
          Quick Actions
        </Text>

        {quickActions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            onPress={() => handleActionPress(action)}
          />
        ))}

        {/* Emergency Contact */}
        <View
          style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#F59E0B',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#92400E',
              marginBottom: 4,
            }}
          >
            Emergency Helpline
          </Text>
          <Text style={{ fontSize: 14, color: '#A16207' }}>
            For immediate assistance: 1800-111-234
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}