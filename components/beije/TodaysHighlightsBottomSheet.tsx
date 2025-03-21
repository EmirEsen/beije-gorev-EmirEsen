import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { IInsightResponse } from '@/models/IInsightResponse';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InsightDot from './ui-from-figma/InsightDot';

interface TodaysHighlightsProps {
    insights?: IInsightResponse;
    onSheetExpand?: (isExpanded: boolean) => void;
}

const TodaysHighlightsBottomSheet: React.FC<TodaysHighlightsProps> = ({
    insights,
    onSheetExpand
}) => {
    // // Get safe area insets to adjust for tab bar
    const insets = useSafeAreaInsets();
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    // Make the first snap point higher to ensure visibility
    const snapPoints = useMemo(() => ['17.8%', '65%'], []);
    // Track expanded state
    const [isExpanded, setIsExpanded] = useState(false);
    // Track the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        const expanded = index === 1; // 1 is the index for 65%
        setIsExpanded(expanded);
        setCurrentIndex(index);

        // Notify parent component about expansion state
        if (onSheetExpand) {
            onSheetExpand(expanded);
        }
    }, [onSheetExpand]);

    // Handle attempt to drag beyond index 1
    const handleAnimate = useCallback((_: number, toIndex: number) => {
        // If trying to go beyond index 1, force back to index 1
        if (toIndex > 1 && bottomSheetRef.current) {
            bottomSheetRef.current.snapToIndex(1);
            return false;
        }
        return true;
    }, []);

    const renderItem = ({ item }: { item: { _id: string; title: string; content: string } }) => (
        <View style={styles.insightItem}>
            <View style={styles.insightRow}>
                <InsightDot />
                <View style={styles.insightContent}>
                    <Text style={styles.insightTitle}>{item.title}</Text>
                    <Text style={styles.insightText}>{item.content}</Text>
                </View>
            </View>
        </View>
    );

    React.useEffect(() => {
        const timer = setTimeout(() => {
            bottomSheetRef.current?.snapToIndex(0);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
    });

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            detached={false}
            animationConfigs={animationConfigs}
            onChange={handleSheetChanges}
            onAnimate={handleAnimate}
            enablePanDownToClose={false}
            enableOverDrag={false}
            index={currentIndex}
            handleIndicatorStyle={styles.handleIndicator}
            backgroundStyle={styles.bottomSheetBackground}
            handleStyle={styles.handleContainer}
            style={styles.bottomSheet}
            topInset={insets.top}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.header}>Bugün Öne Çıkanlar</Text>

                <FlatList
                    data={insights?.data.insights}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        zIndex: 1000,
    },
    bottomSheetBackground: {
        backgroundColor: '#F7F7F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    handleContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: '#F7F7F7',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    contentContainer: {
        flex: 1,
        padding: 16
    },
    header: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 12,
        textAlign: 'left',
    },
    listContainer: {
        paddingBottom: 260,
    },
    insightItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    insightRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insightContent: {
        flex: 1,
        marginLeft: 12,
    },
    insightTitle: {
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 8,
        color: '#B1B1B1',
    },
    insightText: {
        fontSize: 16,
        color: '#343131',
        lineHeight: 20,
    },
    handleIndicator: {
        backgroundColor: '#696969',
        width: 50,
        height: 5,
    },
});

export default TodaysHighlightsBottomSheet;
