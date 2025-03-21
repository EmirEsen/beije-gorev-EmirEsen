import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { getProfile, getMenstrationDays, getInsights } from '@/store/feature/ProfileSlice';
import { AppDispatch } from '@/store';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [animationCycles, setAnimationCycles] = useState(0);
    const [apiCallsComplete, setApiCallsComplete] = useState(false);
    const animationRef = useRef<LottieView>(null);
    const dispatch = useDispatch<AppDispatch>();

    // Start API calls on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dispatch all API calls in parallel
                await Promise.all([
                    dispatch(getProfile()),
                    dispatch(getMenstrationDays()),
                    dispatch(getInsights())
                ]);

                // Mark API calls as complete
                setApiCallsComplete(true);
            } catch (error) {
                console.error('Error loading initial data:', error);
                // Even if there's an error, we'll mark as complete to allow navigation
                setApiCallsComplete(true);
            }
        };

        fetchData();
    }, [dispatch]);

    // Check if we can proceed to the next screen
    useEffect(() => {
        if (apiCallsComplete && animationCycles >= 3) {
            onFinish();
        }
    }, [apiCallsComplete, animationCycles, onFinish]);

    const handleAnimationFinish = () => {
        // Increment animation cycle count
        setAnimationCycles(prev => prev + 1);

        // If we haven't reached 3 cycles yet, play the animation again
        if (animationCycles < 2) { // Check for < 2 since state updates are async
            if (animationRef.current) {
                animationRef.current.reset();
                animationRef.current.play();
            }
        }
    };

    return (
        <LinearGradient
            colors={['rgba(253, 236, 231, 1)', '#fff']}
            style={styles.container}
        >
            <LottieView
                ref={animationRef}
                source={require('../../assets/splashAnimation.json')}
                autoPlay
                loop={false}
                style={styles.animation}
                onAnimationFinish={handleAnimationFinish}
            />
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    animation: {
        width: width * 0.3,
        height: height * 0.3,
    },
    logo: {
        position: 'absolute',
        bottom: height * 0.1,
        width: width * 0.2,
        height: height * 0.1,
    },
});

export default SplashScreen;
