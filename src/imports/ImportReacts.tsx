// ImportReacts.tsx

import React, {
  useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef, createRef, forwardRef,
  createContext, useContext, Suspense, lazy,
} from "react";

import {
  SafeAreaView, StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal, BackHandler,
} from 'react-native';

import {
  WebView,
} from 'react-native-webview';

import {
  BannerAd, BannerAdSize, TestIds,
} from "react-native-google-mobile-ads";

import {
  FlexWidget, TextWidget, ImageWidget, WidgetTaskHandlerProps,
} from "react-native-android-widget";

import * as RNLocalize from 'react-native-localize';

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
  RNLocalize,
};