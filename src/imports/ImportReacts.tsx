// ImportReacts.tsx

import React, {
  useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef, createRef, forwardRef,
  createContext, useContext, Suspense, lazy,
} from "react";

import {
	StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal, BackHandler, SafeAreaView,
} from 'react-native';

import {
	SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  WebView,
} from 'react-native-webview';

import {
  BannerAd, BannerAdSize, TestIds,
} from "react-native-google-mobile-ads";

import {
  FlexWidget, TextWidget, ImageWidget, ColorProp
} from "react-native-android-widget";

import type {
  WidgetTaskHandlerProps,
} from "react-native-android-widget";

// -------------------------------------------------------------------------------------------------
export {
  React,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
  createRef,
  forwardRef,
  createContext,
  useContext,
  Suspense,
  lazy,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
  BackHandler,
  WebView,
  BannerAd,
  BannerAdSize,
  TestIds,
  FlexWidget,
  TextWidget,
  ImageWidget,
  WidgetTaskHandlerProps,
  SafeAreaProvider,
};

export type {
  ColorProp,
};