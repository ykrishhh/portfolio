import {
  Shield,
  Cpu,
  Globe,
  DeviceMobile,
  Terminal,
  Bug
} from "@phosphor-icons/react";

export const SKILL_CATEGORIES = [
  {
    name: "Offensive Security",
    icon: Bug,
    skills: [
      "Penetration Testing",
      "Vulnerability Research",
      "Red Teaming",
      "CVE Discovery",
      "Exploit Development",
    ],
  },
  {
    name: "Systems & Firmware",
    icon: Cpu,
    skills: [
      "ESP32 / RP2040",
      "Firmware Reversing",
      "UART / JTAG / SPI",
      "eBPF & Kernel Hooking",
      "RF & BLE Research",
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: Globe,
    skills: [
      "Linux Systems",
      "CI/CD Pipelines",
      "Docker & Containers",
      "VPS Deployments",
      "Infrastructure Automation",
    ],
  },
  {
    name: "Mobile Security",
    icon: DeviceMobile,
    skills: [
      "Android Hooking (Frida)",
      "DEX/APK Reversing",
      "Xposed & KernelSU",
      "Attestation Bypass",
      "iOS Research",
    ],
  },
  {
    name: "AI & Tooling",
    icon: Shield,
    skills: [
      "Local LLMs (Ollama)",
      "Agentic Pipelines",
      "LangChain",
      "Python Automation",
      "AI-Assisted Vuln Discovery",
    ],
  },
  {
    name: "Low-Level",
    icon: Terminal,
    skills: [
      "C / Rust",
      "Binary Exploitation",
      "Reverse Engineering",
      "Loader & Linker Attacks",
      "Side-Channel Attacks",
    ],
  },
];
