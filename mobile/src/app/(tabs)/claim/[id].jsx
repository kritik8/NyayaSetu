import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Download,
  Hash,
  Eye,
  Share,
  AlertCircle
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";

const timelineData = [
  {
    id: 1,
    title: 'Application Submitted',
    description: 'FIR complaint submitted to CCTNS',
    timestamp: '2025-01-15 10:30 AM',
    status: 'completed',
    signer: 'System Auto-Generated',
    blockchainHash: 'bc1a2f3e4d5c6b7a8e9f0123456789',
    documents: ['Original Complaint', 'Evidence Files']
  },
  {
    id: 2,
    title: 'ML Pre-Check Completed',
    description: 'AI verification completed with 87% confidence',
    timestamp: '2025-01-15 10:45 AM',
    status: 'completed',
    signer: 'ML System (POA-ML-001)',
    blockchainHash: 'bc2b3f4e5d6c7b8a9e0f123456789a',
    documents: ['ML Analysis Report']
  },
  {
    id: 3,
    title: 'DigiLocker Verified',
    description: 'Document authenticity confirmed via DigiLocker',
    timestamp: '2025-01-15 11:15 AM',
    status: 'completed',
    signer: 'DigiLocker API (DL-***789)',
    blockchainHash: 'bc3c4f5e6d7c8b9a0e1f23456789ab',
    documents: ['Verification Certificate']
  },
  {
    id: 4,
    title: 'Police Verification',
    description: 'Initial investigation completed, case verified',
    timestamp: '2025-01-15 02:30 PM',
    status: 'completed',
    signer: 'SI Rajesh Kumar (***234)',
    blockchainHash: 'bc4d5f6e7d8c9b0a1e2f3456789abc',
    documents: ['Police Report', 'Investigation Notes']
  },
  {
    id: 5,
    title: 'Emergency Grant Processing',
    description: 'Immediate relief fund being processed',
    timestamp: '2025-01-15 04:00 PM',
    status: 'in-progress',
    signer: 'PFMS Gateway',
    blockchainHash: 'bc5e6f7e8d9c0b1a2e3f456789abcd',
    documents: []
  },
  {
    id: 6,
    title: 'Final Approval',
    description: 'Case review and final compensation approval',
    timestamp: 'Pending',
    status: 'pending',
    signer: 'District Collector',
    blockchainHash: '',
    documents: []
  },
  {
    id: 7,
    title: 'Funds Released',
    description: 'Compensation transferred to beneficiary account',
    timestamp: 'Pending',
    status: 'pending',
    signer: 'PFMS System',
    blockchainHash: '',
    documents: []
  }
];

function TimelineItem({ item, isLast }) {
  const [showBlockchain, setShowBlockchain] = useState(false);

  const getStatusColor = () => {
    switch (item.status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'pending': return '#9CA3AF';
      default: return '#9CA3AF';
    }
  };

  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon();
  const statusColor = getStatusColor();

  const handleBlockchainPress = () => {
    if (item.blockchainHash) {
      Haptics.lightAsync();
      setShowBlockchain(true);
    }
  };

  return (
    <View style={{ flexDirection: 'row', paddingBottom: isLast ? 0 : 24 }}>
      {/* Timeline Line */}
      <View style={{ alignItems: 'center', marginRight: 16 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: statusColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StatusIcon size={18} color="#FFFFFF" />
        </View>
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: item.status === 'completed' ? statusColor : '#E5E7EB',
              marginTop: 8,
            }}
          />
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: '#F3F4F6',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
                {item.description}
              </Text>
            </View>
            
            {item.blockchainHash && (
              <TouchableOpacity
                onPress={handleBlockchainPress}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: '#1A73E815',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Hash size={16} color="#1A73E8" />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
              {item.timestamp}
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Signer: {item.signer}
            </Text>
          </View>

          {item.documents.length > 0 && (
            <View>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
                Documents:
              </Text>
              {item.documents.map((doc, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <FileText size={14} color="#6B7280" />
                  <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 6 }}>
                    {doc}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Blockchain Modal */}
        <Modal
          visible={showBlockchain}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowBlockchain(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 24,
                width: '100%',
                maxWidth: 400,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Hash size={24} color="#1A73E8" />
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginLeft: 12 }}>
                  Blockchain Hash
                </Text>
              </View>
              
              <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>
                This event has been anchored on a permissioned blockchain ledger for audit trail verification.
              </Text>
              
              <View
                style={{
                  backgroundColor: '#F3F4F6',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 12, fontFamily: 'monospace', color: '#374151' }}>
                  {item.blockchainHash}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowBlockchain(false)}
                style={{
                  backgroundColor: '#1A73E8',
                  borderRadius: 8,
                  padding: 12,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '500' }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default function ClaimDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const claimData = {
    id: 'NYS-2025-0012',
    type: 'FIR - Caste Discrimination',
    status: 'Police Verified',
    progress: 75,
    amount: '₹2,000',
    expectedAmount: '₹5,000',
    applicant: 'Suman Devi',
    location: 'Village Kanchanpur, Dist. Rajgarh',
    incidentDate: '2025-01-10',
    filedDate: '2025-01-15',
    nextReviewDate: '2025-01-18'
  };

  const downloadCaseBundle = () => {
    Haptics.lightAsync();
    // Simulate download
    alert('Case bundle download started');
  };

  const shareCase = () => {
    Haptics.lightAsync();
    // Simulate share
    alert('Case details shared');
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
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
              Claim Details
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {claimData.id}
            </Text>
          </View>
          <TouchableOpacity onPress={shareCase} style={{ marginLeft: 8 }}>
            <Share size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>
              Progress: {claimData.progress}%
            </Text>
            <Text style={{ fontSize: 14, color: '#1A73E8', fontWeight: '500' }}>
              {claimData.status}
            </Text>
          </View>
          <View style={{ height: 8, backgroundColor: '#F3F4F6', borderRadius: 4 }}>
            <View
              style={{
                height: 8,
                backgroundColor: '#1A73E8',
                borderRadius: 4,
                width: `${claimData.progress}%`,
              }}
            />
          </View>
        </View>

        {/* Quick Info */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Current Amount</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>
              {claimData.amount}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Expected Total</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#10B981' }}>
              {claimData.expectedAmount}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Next Review</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#F59E0B' }}>
              Jan 18
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Case Information */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
            Case Information
          </Text>
          
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Type:</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>{claimData.type}</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Applicant:</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>{claimData.applicant}</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Location:</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>{claimData.location}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Incident Date:</Text>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>{claimData.incidentDate}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Filed Date:</Text>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>{claimData.filedDate}</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
            Timeline & Audit Trail
          </Text>
          
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </View>

        {/* Download Case Bundle */}
        <TouchableOpacity
          onPress={downloadCaseBundle}
          style={{
            backgroundColor: '#1A73E8',
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Download size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>
            Download Case Bundle
          </Text>
        </TouchableOpacity>

        {/* Emergency Contact */}
        <View
          style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            padding: 16,
            borderLeftWidth: 4,
            borderLeftColor: '#F59E0B',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <AlertCircle size={20} color="#F59E0B" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#92400E', marginLeft: 8 }}>
              Need Help?
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: '#A16207' }}>
            For urgent matters or case updates, call our helpline: 1800-111-234
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}