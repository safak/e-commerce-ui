"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

// 震动反馈逻辑
const triggerHaptic = () => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(10);
  }
};

const SmoothRuler = ({ value, onChange, min, max, unit, label }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 计算总长度：每个刻度 10px
  const range = max - min;
  const stepWidth = 10;
  const offset = useMotionValue(-(value - min) * stepWidth);

  // 监听位移并同步数值
  useEffect(() => {
    const unsubscribe = offset.on("change", (latest) => {
      const newValue = Math.round((min + Math.abs(latest / stepWidth)) * 2) / 2;
      if (newValue !== value && newValue >= min && newValue <= max) {
        onChange(newValue);
        triggerHaptic();
      }
    });
    return () => unsubscribe();
  }, [offset, min, max, value, onChange]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <div className="flex items-baseline font-mono">
          <span className="text-4xl font-bold text-cyan-500">{value}</span>
          <span className="text-sm ml-1 text-gray-400">{unit}</span>
        </div>
      </div>

      <div className="relative h-20 overflow-hidden touch-none cursor-grab active:cursor-grabbing">
        {/* 中间指示器指针 */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-[3px] h-8 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-500 mt-[-2px]" />
        </div>

        {/* 刻度容器 */}
        <motion.div
          drag="x"
          dragConstraints={{
            left: -range * stepWidth,
            right: 0,
          }}
          style={{ x: offset }}
          dragElastic={0.1}
          dragTransition={{ power: 0.2, timeConstant: 200 }} // 控制惯性大小
          className="flex items-end h-full pl-[50%] will-change-transform"
        >
          {Array.from({ length: range + 1 }).map((_, i) => {
            const currentVal = min + i;
            const isMajor = currentVal % 10 === 0;
            const isMedium = currentVal % 5 === 0;

            return (
              <div
                key={i}
                style={{ width: stepWidth }}
                className="flex-shrink-0 flex flex-col items-center"
              >
                {isMajor && (
                  <span className="text-[10px] text-gray-400 mb-2 font-mono">
                    {currentVal}
                  </span>
                )}
                <div
                  className={`w-[1px] rounded-full transition-colors ${
                    isMajor
                      ? "h-8 bg-gray-400"
                      : isMedium
                        ? "h-5 bg-gray-300"
                        : "h-3 bg-gray-200"
                  }`}
                />
              </div>
            );
          })}
        </motion.div>

        {/* 左右渐变遮罩，增加高级感 */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

// 主页面组件
const SizeProfilePage = () => {
  const router = useRouter();
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(65);
  const [gender, setGender] = useState("male");
  const [footLength, setFootLength] = useState(26);
  const [shoeSize, setShoeSize] = useState(42);

  useEffect(() => {
    setShoeSize(getShoeSize(footLength));
  }, [footLength]);
  // 计算EU鞋码
  function getShoeSize(cm: number) {
    if (cm < 23) return 38;
    if (cm < 24) return 39;
    if (cm < 25) return 40;
    if (cm < 26) return 41;
    if (cm < 27) return 42;
    if (cm < 28) return 43;
    if (cm < 29) return 44;
    if (cm < 30) return 45;
    return 46;
  }
  // 保存到metadata
  const handleSave = async () => {
    const res = await fetch("/api/size-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        height,
        weight,
        gender,
        footLength,
        shoeSize,
      }),
    });

    if (res.ok) {
      router.back();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col select-none">
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold">Basic info</h1>
        <button onClick={() => router.back()}>
          <X className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      <div className="p-6 space-y-12">
        {/* 性别选择部分 */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-6">Gender</h2>
          <div className="flex gap-8">
            {["male", "female"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  gender === g
                    ? g === "male"
                      ? "bg-cyan-50 ring-2 ring-cyan-500"
                      : "bg-pink-50 ring-2 ring-pink-500"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <span
                  className={`text-2xl ${gender === g ? (g === "male" ? "text-cyan-500" : "text-pink-500") : "text-gray-300"}`}
                >
                  {g === "male" ? "♂" : "♀"}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 丝滑刻度尺 */}
        <SmoothRuler
          label="Height"
          value={height}
          onChange={setHeight}
          min={100}
          max={220}
          unit="cm"
        />
        <SmoothRuler
          label="Weight"
          value={weight}
          onChange={setWeight}
          min={30}
          max={180}
          unit="kg"
        />
        <SmoothRuler
          label="Foot Length"
          value={footLength}
          onChange={setFootLength}
          min={22}
          max={30}
          unit="cm"
        />
        <div className="text-center mt-2">
          <span className="text-sm text-gray-500">Recommended</span>
          <div className="text-xl font-bold text-cyan-500">EU {shoeSize}</div>
        </div>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold active:scale-[0.98] transition-transform"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SizeProfilePage;
