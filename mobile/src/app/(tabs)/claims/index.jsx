import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Hash,
  Eye,
  Download,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const claimsData = [
  {
    id: "NYS-2025-0003",
    type: "FIR - Workplace Discrimination",
    status: "Funds Released",
    date: "2025-01-08",
    amount: "₹5,000",
    priority: "completed",
    progress: 100,
    lastUpdate: "3 days ago",
    nextStep: "Completed",
  },
];

const statusConfig = {
  Submitted: { color: "#6B7280", icon: Clock },
  "ML Verified": { color: "#F59E0B", icon: Shield },
  "Police Verified": { color: "#1A73E8", icon: CheckCircle },
  "Funds Released": { color: "#10B981", icon: CheckCircle },
  "Under Review": { color: "#EF4444", icon: AlertCircle },
  Completed: { color: "#10B981", icon: CheckCircle },
};

function ClaimCard({ claim, onPress }) {
  const statusInfo = statusConfig[claim.status] || statusConfig["Submitted"];
  const StatusIcon = statusInfo.icon;

  const getPriorityColor = () => {
    switch (claim.priority) {
      case "high":
        return "#EF4444";
      case "medium":
        return "#F59E0B";
      case "completed":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#F3F4F6",
      }}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
              {claim.id}
            </Text>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: getPriorityColor(),
                marginLeft: 8,
              }}
            />
          </View>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>{claim.type}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
          >
            <Hash size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Status and Amount */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: `${statusInfo.color}15`,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 12,
          }}
        >
          <StatusIcon size={14} color={statusInfo.color} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: statusInfo.color,
              marginLeft: 6,
            }}
          >
            {claim.status}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#111827",
            flex: 1,
            textAlign: "right",
          }}
        >
          {claim.amount}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 12, color: "#6B7280" }}>Progress</Text>
          <Text style={{ fontSize: 12, fontWeight: "500", color: "#374151" }}>
            {claim.progress}%
          </Text>
        </View>
        <View
          style={{ height: 6, backgroundColor: "#F3F4F6", borderRadius: 3 }}
        >
          <View
            style={{
              height: 6,
              backgroundColor: statusInfo.color,
              borderRadius: 3,
              width: `${claim.progress}%`,
            }}
          />
        </View>
      </View>

      {/* Last Update and Next Step */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
          Updated {claim.lastUpdate}
        </Text>
        <Text style={{ fontSize: 12, color: "#1A73E8", fontWeight: "500" }}>
          {claim.nextStep}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function FilterTab({ title, count, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: active ? "#1A73E8" : "#F3F4F6",
        marginRight: 12,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: active ? "#FFFFFF" : "#6B7280",
        }}
      >
        {title} ({count})
      </Text>
    </TouchableOpacity>
  );
}

export default function ClaimsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", title: "All", count: claimsData.length },
    {
      id: "active",
      title: "Active",
      count: claimsData.filter((c) => c.progress < 100).length,
    },
    {
      id: "completed",
      title: "Completed",
      count: claimsData.filter((c) => c.progress === 100).length,
    },
  ];

  const filteredClaims = claimsData.filter((claim) => {
    if (activeFilter === "active") return claim.progress < 100;
    if (activeFilter === "completed") return claim.progress === 100;
    return true;
  });

  const handleClaimPress = (claim) => {
    Haptics.lightAsync();
    router.push(`/claim/${claim.id}`);
  };

  const handleFilterPress = (filterId) => {
    Haptics.lightAsync();
    setActiveFilter(filterId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#111827",
            marginBottom: 8,
          }}
        >
          My Claims
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7280" }}>
          Track your applications and view status updates
        </Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        {filterTabs.map((tab) => (
          <FilterTab
            key={tab.id}
            title={tab.title}
            count={tab.count}
            active={activeFilter === tab.id}
            onPress={() => handleFilterPress(tab.id)}
          />
        ))}
      </ScrollView>

      {/* Claims List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              onPress={() => handleClaimPress(claim)}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 80,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <FileText size={40} color="#9CA3AF" />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              No Claims Found
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              You don't have any {activeFilter === "all" ? "" : activeFilter}{" "}
              claims yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
