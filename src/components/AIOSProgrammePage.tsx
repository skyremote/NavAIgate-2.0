import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import {
  Zap, Users, MapPin, Calendar, Target, Brain, BarChart3,
  MessageSquare, Layers, Workflow, Presentation, GraduationCap,
  Clock, ArrowRight, CheckCircle2, Building2, Briefcase, UserCheck, Code2,
  Cpu, Database, FileText, Settings, Network, Shield, Sparkles, Globe,
  Mail, ChevronRight, TrendingUp, Bot, Wrench, KeyRound, ClipboardList,
  LayoutGrid, UsersRound, FileBarChart
} from 'lucide-react';

const TALLY_FORM_ID = '0QLOJj';

/* ─────────────────────────────────────────────
   Interactive AIOS Brain — Full-Viewport Network
   Inspired by autonomee.ai's force graph style
   ───────────────────────────────────────────── */

interface NetNode {
  id: string;
  label: string;
  category: string;
  outcome: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number; // pixel radius
  isCenter?: boolean;
}

const AIOS_NODES: { label: string; category: string; outcome: string; dist: number; angle: number; size: number }[] = [
  // Inner ring — core OS layers
  { label: 'Tools', category: 'Core Layer', outcome: 'AI reads, writes, researches, and executes across your entire business', dist: 0.18, angle: 0, size: 8 },
  { label: 'Context', category: 'Core Layer', outcome: 'Your AI knows who you are, your strategy, and your priorities', dist: 0.20, angle: 45, size: 9 },
  { label: 'Access', category: 'Core Layer', outcome: 'Connected to every system — CRM, email, analytics, financials', dist: 0.17, angle: 90, size: 7 },
  { label: 'Tasks', category: 'Core Layer', outcome: 'Automated task execution — from research to reporting in seconds', dist: 0.22, angle: 135, size: 8 },
  { label: 'Data', category: 'Core Layer', outcome: 'Live data feeds powering real-time decisions and reports', dist: 0.19, angle: 180, size: 9 },
  { label: 'Workflows', category: 'Core Layer', outcome: 'Custom commands that automate your top 5 repetitive tasks', dist: 0.21, angle: 225, size: 8 },
  { label: 'Team', category: 'Core Layer', outcome: 'Shared playbooks so your AI works for the whole team', dist: 0.18, angle: 270, size: 7 },
  { label: 'Reports', category: 'Core Layer', outcome: 'Branded reports generated in under 60 seconds', dist: 0.20, angle: 315, size: 8 },
  // Middle ring — capabilities
  { label: 'CRM Sync', category: 'Integration', outcome: 'Pipeline data flows directly into your AI Operating System', dist: 0.34, angle: 20, size: 6 },
  { label: 'Smart Check-in', category: 'Proactive AI', outcome: 'Your AI flags what matters before you even ask', dist: 0.32, angle: 65, size: 7 },
  { label: 'Email Agent', category: 'Automation', outcome: 'Draft, review, and send communications autonomously', dist: 0.36, angle: 110, size: 6 },
  { label: 'Analytics', category: 'Intelligence', outcome: 'Turn raw data into executive summaries instantly', dist: 0.30, angle: 155, size: 7 },
  { label: 'Playbooks', category: 'Operations', outcome: 'Self-updating knowledge base that onboards new hires', dist: 0.35, angle: 200, size: 5 },
  { label: 'Proposals', category: 'Output', outcome: 'Client proposals generated from CRM + market data in minutes', dist: 0.33, angle: 245, size: 6 },
  { label: 'Onboarding', category: 'Operations', outcome: 'New team members get answers from AI on day one', dist: 0.37, angle: 290, size: 5 },
  { label: 'Competitor Intel', category: 'Intelligence', outcome: 'Type a name — get a branded competitive deck in 90 seconds', dist: 0.31, angle: 335, size: 7 },
  // Outer ring — extensions
  { label: 'API Hub', category: 'Integration', outcome: 'Multi-system orchestration via webhooks and APIs', dist: 0.46, angle: 10, size: 5 },
  { label: 'Presentations', category: 'Output', outcome: 'AI-generated branded decks from your data — ready for clients', dist: 0.44, angle: 55, size: 5 },
  { label: 'Financials', category: 'Data Source', outcome: 'Weekly financial summaries — no spreadsheets required', dist: 0.48, angle: 100, size: 4 },
  { label: 'Scheduling', category: 'Automation', outcome: 'Calendar management and meeting prep handled by AI', dist: 0.42, angle: 150, size: 5 },
  { label: 'Knowledge Base', category: 'Memory', outcome: 'Everything your business knows — searchable and compounding', dist: 0.47, angle: 195, size: 6 },
  { label: 'Client Comms', category: 'Output', outcome: 'Personalised client communications at scale', dist: 0.43, angle: 240, size: 4 },
  { label: 'Team Chat', category: 'Integration', outcome: 'AI embedded in Slack, Teams, and your daily tools', dist: 0.45, angle: 280, size: 5 },
  { label: 'Strategy Docs', category: 'Memory', outcome: 'Living strategy documents that update as your business evolves', dist: 0.41, angle: 330, size: 4 },
];

function createNetNodes(w: number, h: number): NetNode[] {
  const cx = w * 0.55; // offset right to leave room for text on left
  const cy = h * 0.5;
  const scale = Math.min(w, h);

  const center: NetNode = {
    id: 'aios-center',
    label: 'AI OPERATING\nSYSTEM',
    category: '',
    outcome: '',
    x: cx, y: cy, vx: 0, vy: 0,
    targetX: cx, targetY: cy,
    size: 50,
    isCenter: true,
  };

  const nodes: NetNode[] = AIOS_NODES.map((n, i) => {
    const rad = (n.angle * Math.PI) / 180;
    const jitter = (Math.random() - 0.5) * scale * 0.03;
    const tx = cx + Math.cos(rad) * n.dist * scale + jitter;
    const ty = cy + Math.sin(rad) * n.dist * scale + jitter;
    return {
      id: `node-${i}`,
      label: n.label,
      category: n.category,
      outcome: n.outcome,
      x: tx, y: ty, vx: 0, vy: 0,
      targetX: tx, targetY: ty,
      size: n.size,
    };
  });

  return [center, ...nodes];
}

const AIOSBrain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NetNode[]>([]);
  const dragIdRef = useRef<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetNode | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const dimsRef = useRef({ width: 800, height: 600 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        dimsRef.current = { width: r.width, height: r.height };
        if (canvasRef.current) {
          canvasRef.current.width = r.width * dpr;
          canvasRef.current.height = r.height * dpr;
          canvasRef.current.style.width = `${r.width}px`;
          canvasRef.current.style.height = `${r.height}px`;
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.scale(dpr, dpr);
        }
        nodesRef.current = createNetNodes(r.width, r.height);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Canvas render loop
  useAnimationFrame((t, delta) => {
    timeRef.current += delta * 0.001;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const { width: W, height: H } = dimsRef.current;
    const nodes = nodesRef.current;
    if (nodes.length === 0) return;
    const dt = Math.min(delta * 0.001, 0.05);
    const center = nodes[0];
    const time = timeRef.current;

    // When center is dragged, shift all targets so nodes follow
    const centerDragId = dragIdRef.current;
    const isCenterDragged = centerDragId === 'aios-center';
    const centerOffsetX = isCenterDragged ? center.x - center.targetX : 0;
    const centerOffsetY = isCenterDragged ? center.y - center.targetY : 0;

    // Physics
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.id === centerDragId) continue;

      const floatX = Math.sin(time * 0.5 + i * 1.3) * (n.isCenter ? 0 : 3);
      const floatY = Math.cos(time * 0.4 + i * 0.8) * (n.isCenter ? 0 : 3);

      // If center is being dragged, child nodes follow it
      const effectiveTargetX = n.isCenter ? n.targetX : n.targetX + centerOffsetX;
      const effectiveTargetY = n.isCenter ? n.targetY : n.targetY + centerOffsetY;

      const springK = n.isCenter ? 5 : (isCenterDragged ? 3 : 2);
      const dx = (effectiveTargetX + floatX) - n.x;
      const dy = (effectiveTargetY + floatY) - n.y;

      n.vx = (n.vx + dx * springK * dt) * 0.88;
      n.vy = (n.vy + dy * springK * dt) * 0.88;
      n.x += n.vx * dt * 60;
      n.y += n.vy * dt * 60;
    }

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines + travelling chevrons
    for (let i = 1; i < nodes.length; i++) {
      const n = nodes[i];
      const isHovered = hoveredRef.current === n.id;

      // Line
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(n.x, n.y);
      ctx.strokeStyle = isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(148,163,184,0.12)';
      ctx.lineWidth = isHovered ? 1.5 : 0.8;
      ctx.stroke();

      // Travelling chevron particles (2 per line, staggered)
      const lineDx = n.x - center.x;
      const lineDy = n.y - center.y;
      const lineLen = Math.sqrt(lineDx * lineDx + lineDy * lineDy) || 1;
      const lineAngle = Math.atan2(lineDy, lineDx);

      for (let p = 0; p < 2; p++) {
        const progress = ((time * 0.3 + i * 0.15 + p * 0.5) % 1);
        const px = center.x + lineDx * progress;
        const py = center.y + lineDy * progress;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(lineAngle);

        // Draw small chevron/arrow
        const sz = isHovered ? 5 : 3.5;
        ctx.beginPath();
        ctx.moveTo(sz, 0);
        ctx.lineTo(-sz, -sz * 0.6);
        ctx.lineTo(-sz * 0.4, 0);
        ctx.lineTo(-sz, sz * 0.6);
        ctx.closePath();
        ctx.fillStyle = isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(59,130,246,0.5)';
        ctx.fill();

        ctx.restore();
      }
    }

    // Draw center hub — concentric rings
    const cGlow = 0.08 + Math.sin(time * 2) * 0.04;
    // Outer glow
    const outerGrad = ctx.createRadialGradient(center.x, center.y, 40, center.x, center.y, 90);
    outerGrad.addColorStop(0, `rgba(59,130,246,${cGlow})`);
    outerGrad.addColorStop(1, 'rgba(59,130,246,0)');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 90, 0, Math.PI * 2);
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(center.x, center.y, 65, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59,130,246,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(center.x, center.y, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59,130,246,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Fill inner circle
    const innerGrad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 50);
    innerGrad.addColorStop(0, 'rgba(30,41,59,0.95)');
    innerGrad.addColorStop(1, 'rgba(15,23,42,0.9)');
    ctx.fillStyle = innerGrad;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 49, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting chevrons around center
    for (let c = 0; c < 12; c++) {
      const orbitAngle = (c / 12) * Math.PI * 2 + time * 0.8;
      const orbitR = 57;
      const ox = center.x + Math.cos(orbitAngle) * orbitR;
      const oy = center.y + Math.sin(orbitAngle) * orbitR;

      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(orbitAngle + Math.PI / 2);
      const csz = 4;
      ctx.beginPath();
      ctx.moveTo(0, -csz);
      ctx.lineTo(csz * 0.5, 0);
      ctx.lineTo(0, csz);
      ctx.lineTo(-csz * 0.3, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(59,130,246,0.6)';
      ctx.fill();
      ctx.restore();
    }

    // Center text
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI OPERATING', center.x, center.y - 8);
    ctx.fillText('SYSTEM', center.x, center.y + 6);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 9px Inter, system-ui, sans-serif';
    ctx.letterSpacing = '0.1em';
    ctx.fillText(`${nodes.length - 1} CONNECTED`, center.x, center.y + 22);

    // Draw outer nodes
    for (let i = 1; i < nodes.length; i++) {
      const n = nodes[i];
      const isHovered = hoveredRef.current === n.id;
      const drawSize = isHovered ? n.size * 1.6 : n.size;

      if (isHovered) {
        // Outer glow ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, drawSize + 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fill();

        // White glow
        ctx.shadowColor = 'rgba(255,255,255,0.5)';
        ctx.shadowBlur = 20;
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, drawSize, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(148,163,184,0.3)';
      ctx.fill();

      // Border
      ctx.beginPath();
      ctx.arc(n.x, n.y, drawSize, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(148,163,184,0.15)';
      ctx.lineWidth = isHovered ? 2 : 0.5;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    }
  });

  // Hit detection for hover
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const nodes = nodesRef.current;

    // If dragging, move the node (works for center too)
    if (dragIdRef.current) {
      const node = nodes.find(n => n.id === dragIdRef.current);
      if (node) {
        node.x = mx;
        node.y = my;
        node.vx = 0;
        node.vy = 0;
      }
      return;
    }

    // Hit test — generous hit area (min 18px radius)
    let found: NetNode | null = null;
    for (let i = 1; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = mx - n.x;
      const dy = my - n.y;
      const hitRadius = Math.max(n.size + 12, 18);
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        found = n;
        break;
      }
    }

    // Update cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = found ? 'pointer' : 'default';
    }

    hoveredRef.current = found?.id ?? null;
    setHoveredNode(found);
    setHoverPos({ x: mx, y: my });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const nodes = nodesRef.current;

    // Check all nodes including center (i=0)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = mx - n.x;
      const dy = my - n.y;
      const hitRadius = n.isCenter ? 55 : Math.max(n.size + 12, 18);
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        dragIdRef.current = n.id;
        if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        break;
      }
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragIdRef.current) {
      const node = nodesRef.current.find(n => n.id === dragIdRef.current);
      if (node) {
        node.vx = (node.targetX - node.x) * 0.4;
        node.vy = (node.targetY - node.y) * 0.4;
      }
      if (containerRef.current) containerRef.current.style.cursor = 'default';
      dragIdRef.current = null;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none"
      style={{ touchAction: 'none' }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => { hoveredRef.current = null; setHoveredNode(null); }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Hover tooltip with outcome */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none z-20 px-4 py-3 rounded-xl bg-background-lighter/95 border border-white/15 backdrop-blur-md shadow-2xl max-w-[280px]"
          style={{
            left: hoverPos.x + 20,
            top: hoverPos.y - 16,
            transform: hoverPos.x > dimsRef.current.width * 0.65 ? 'translateX(calc(-100% - 40px))' : undefined,
          }}
        >
          <p className="text-white font-bold text-sm leading-tight">{hoveredNode.label}</p>
          <p className="text-accent-blue text-[10px] font-semibold tracking-wider uppercase mt-1">{hoveredNode.category}</p>
          {hoveredNode.outcome && (
            <p className="text-text-secondary text-xs leading-relaxed mt-2 border-t border-white/10 pt-2">{hoveredNode.outcome}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Section Wrapper with Framer Motion
   ───────────────────────────────────────────── */

const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}> = ({ children, className = '', id, delay = 0 }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.section>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-accent-blue font-semibold tracking-widest uppercase text-sm mb-4">
    {children}
  </p>
);

/* ─────────────────────────────────────────────
   1. Hero Section
   ───────────────────────────────────────────── */

const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Subtle grid background */}
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: '#0a0f1a',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    {/* Interactive brain — full bleed behind everything */}
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    >
      <AIOSBrain />
    </motion.div>

    {/* Text overlay — positioned left, pointer-events pass through to brain */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 pointer-events-none">
      <div className="max-w-lg">
        <div className="text-center md:text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Zap size={16} />
            <span>On-Site Only &middot; 6–8 People Per Cohort &middot; Outcome-Driven</span>
          </motion.div>

          <motion.p
            className="text-accent-blue font-semibold tracking-widest uppercase text-xs mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            For Professionals Who Build, Not Rent
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your AI{' '}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal bg-clip-text text-transparent">
              Operating System.
            </span>
            <br />
            <span className="text-text-secondary italic font-light">Your Intelligence.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Stop duct-taping 15 AI tools that forget you every session. Build one AI
            Operating System using Claude Code — one immersive day, real outcomes,
            applicable everywhere.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center md:items-start gap-4 mb-10 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-accent-blue text-white px-8 py-4 rounded-lg hover:bg-accent-blue/90 transition-all font-semibold text-lg shadow-lg shadow-accent-blue/20"
            >
              Apply Now <ArrowRight size={20} />
            </a>
            <a
              href="#outcomes"
              className="inline-flex items-center gap-2 border border-white/10 text-text-secondary px-8 py-4 rounded-lg hover:border-white/20 hover:text-text-primary transition-all font-medium text-lg"
            >
              Resources
            </a>
          </motion.div>

          {/* Location pills */}
          <motion.div
            className="flex flex-wrap items-center md:items-start gap-4 text-text-muted text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> London
            </span>
            <span className="text-text-muted/30">&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> Ingolstadt
            </span>
            <span className="text-text-muted/30">&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> Los Angeles
            </span>
            <span className="text-text-muted/30">&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> Dates TBD
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   2. Manifesto Section — Build Your AI Operating System
   ───────────────────────────────────────────── */

const manifestoPillars = [
  {
    icon: Cpu,
    title: "AI Isn't a Chatbot — It's Infrastructure",
    desc: 'Stop treating AI as a toy you ask questions. Start treating it as the central nervous system of your entire business.',
    color: 'from-accent-blue to-accent-teal',
  },
  {
    icon: Shield,
    title: 'Your AIOS Is Uniquely Yours',
    desc: 'Built around your processes, your data, your strategy. Not a generic template — a system that knows you.',
    color: 'from-accent-purple to-accent-blue',
  },
  {
    icon: Target,
    title: 'Outcomes Over Theory',
    desc: 'Every session produces something real. You leave with a working system, not a certificate.',
    color: 'from-accent-teal to-accent-blue',
  },
  {
    icon: TrendingUp,
    title: 'It Compounds',
    desc: 'Every workflow you automate, every context you add, makes the system exponentially more valuable.',
    color: 'from-accent-blue to-accent-purple',
  },
];

const ManifestoSection: React.FC = () => (
  <FadeInSection id="manifesto" className="relative py-24 bg-background-lighter/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>Our Manifesto</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Build Your{' '}
          <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            AI Operating System
          </span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Four principles that define how we think about AI in business.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {manifestoPillars.map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={i}
            className="group relative p-8 rounded-xl bg-background-dark border border-white/5 hover:border-accent-blue/30 transition-all overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
            <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-5">
              <Icon size={24} className="text-accent-blue" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-text-primary">{title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   3. Outcomes Section
   ───────────────────────────────────────────── */

const outcomes = [
  {
    icon: Brain,
    title: 'Your Own AI Operating System',
    desc: 'A fully configured AI system that knows your business, your role, your strategy, and your priorities — running on day one after the programme.',
  },
  {
    icon: Workflow,
    title: '5+ Automated Workflows',
    desc: 'Custom commands for your top time-draining tasks: reporting, competitor research, client proposals, team updates — automated and branded.',
  },
  {
    icon: BarChart3,
    title: 'Live Data Connections',
    desc: 'Your CRM, analytics, and financial data connected to your AIOS. Real-time reports generated in under 60 seconds.',
  },
  {
    icon: Presentation,
    title: 'Branded Output Templates',
    desc: 'AI-generated presentations, proposals, and communications — in your brand, your tone, your format. Ready for clients.',
  },
  {
    icon: Users,
    title: 'Team Playbooks',
    desc: 'Shared context and operational playbooks so your AI works for your team, not just you. A self-updating knowledge base.',
  },
  {
    icon: Target,
    title: '90-Day Scaling Roadmap',
    desc: 'A personalised plan to extend your AIOS across every function — with milestones, priorities, and ongoing support.',
  },
];

const metrics = [
  { value: '20–100x', label: 'Operational Efficiency Gain' },
  { value: '80%', label: 'Reduction in Repetitive Tasks' },
  { value: '< 60s', label: 'Report Generation Time' },
  { value: '8', label: 'Sessions to Full AIOS' },
];

const OutcomesSection: React.FC = () => (
  <FadeInSection id="outcomes" className="relative py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>What You Walk Away With</SectionLabel>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Concrete Outcomes.{' '}
          <span className="text-accent-blue">Not Theory.</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          This is not a course with slides and homework. You leave each session with something
          working. Here is what you will have built by the end of the programme:
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {outcomes.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl bg-background-lighter border border-white/5 hover:border-accent-blue/30 transition-all group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors">
              <Icon size={20} className="text-accent-blue" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(({ value, label }, i) => (
          <motion.div
            key={i}
            className="text-center p-6 rounded-xl bg-background-lighter border border-white/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent mb-2">
              {value}
            </p>
            <p className="text-text-muted text-sm">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   4. The 8 Sessions
   ───────────────────────────────────────────── */

const sessions = [
  { num: '01', title: 'Foundation & Mindset', desc: 'AI as an OS, not a chatbot. Install Claude Code, configure your environment, run your first commands.', icon: Brain },
  { num: '02', title: 'Business Context Layer', desc: 'Teach Claude Code who you are, what you do, and your strategy. Build your CLAUDE.md.', icon: Building2 },
  { num: '03', title: 'Data & Intelligence', desc: 'Connect live data — CRM, analytics, financials — into your Claude Code workflows.', icon: Database },
  { num: '04', title: 'Workflow Automation', desc: 'Build custom slash commands that automate your repetitive tasks inside Claude Code.', icon: Workflow },
  { num: '05', title: 'Communication & Reporting', desc: 'AI-generated reports, emails, proposals, and presentations — all from Claude Code.', icon: MessageSquare },
  { num: '06', title: 'Team Operations', desc: 'Scale beyond yourself — shared context files, team playbooks, collaborative AIOS.', icon: Users },
  { num: '07', title: 'Advanced Integrations', desc: 'MCP servers, APIs, webhooks, multi-system orchestration through Claude Code.', icon: Layers },
  { num: '08', title: 'Your AIOS & Roadmap', desc: 'Present your working system. Peer review. Plan for what comes next.', icon: GraduationCap },
];

const ProgrammeSection: React.FC = () => (
  <FadeInSection id="programme" className="relative py-24 bg-background-lighter/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>The Programme</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          8 Sessions. From Zero to{' '}
          <span className="text-accent-blue">Operating System.</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Each session is hands-on. You build on real business problems — yours — not
          hypothetical case studies.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sessions.map(({ num, title, desc, icon: Icon }, i) => (
          <motion.div
            key={num}
            className="relative p-5 rounded-xl bg-background-dark border border-white/5 hover:border-accent-blue/30 transition-all group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="absolute top-0 right-0 text-[4rem] font-black text-white/[0.03] leading-none select-none">
              {num}
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-accent-blue font-bold text-lg">{num}</span>
              <Icon size={18} className="text-text-muted group-hover:text-accent-blue transition-colors" />
            </div>
            <h3 className="font-semibold mb-1 text-sm">{title}</h3>
            <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   5. What Founders Built in a Single Day
   ───────────────────────────────────────────── */

const useCases = [
  { title: 'Automated Invoice Processing', desc: 'Connected to Zoho — AI verifies, categorises, and flags anomalies automatically.' },
  { title: 'Financial Reporting Pipeline', desc: 'Live data feeds into AI-generated weekly financial summaries. No spreadsheets.' },
  { title: 'Competitor Research Agent', desc: 'Type a name → AI scrapes, analyses, produces a branded deck in 90 seconds.' },
  { title: 'Content Creation Pipeline', desc: 'Research → write → schedule → publish across channels. One command.' },
  { title: 'Client QBR Deck Generator', desc: 'CRM data + analytics + market news → branded presentation. Minutes, not hours.' },
  { title: 'Team Onboarding System', desc: 'AI reads your playbooks, answers new hire questions. Self-updating knowledge base.' },
];

const UseCasesSection: React.FC = () => (
  <FadeInSection className="relative py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>Real Results</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          What Founders Built in a{' '}
          <span className="text-accent-blue">Single Day</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          6 non-technical founders. 8 hours. Zero coding experience. Real systems, deployed:
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map(({ title, desc }, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 p-5 rounded-xl bg-background-lighter border border-white/5 hover:border-accent-teal/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <CheckCircle2 size={20} className="text-accent-teal mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   6. Who Is This For
   ───────────────────────────────────────────── */

const audienceCards = [
  {
    icon: Briefcase,
    title: 'CEOs & Founders',
    desc: 'Running a business of 10–500 people. Drowning in operations. Ready to 10x your leverage.',
  },
  {
    icon: Building2,
    title: 'VP / C-Suite Executives',
    desc: 'Managing teams, budgets, and strategic initiatives. Need AI as a force multiplier.',
  },
  {
    icon: UserCheck,
    title: 'Directors & Senior Managers',
    desc: 'Responsible for delivery. Want to automate reporting, planning, and coordination.',
  },
  {
    icon: Code2,
    title: 'Non-Technical Leaders',
    desc: 'No coding background required. If you can describe what your business does, you qualify.',
  },
];

const AudienceSection: React.FC = () => (
  <FadeInSection className="relative py-24 bg-background-lighter/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>Who Is This For</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Built for Senior Leaders,{' '}
          <span className="text-accent-blue">Not Developers</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {audienceCards.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl bg-background-dark border border-white/5 flex items-start gap-5 hover:border-accent-blue/20 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
              <Icon size={22} className="text-accent-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   7. The Automation Spectrum
   ───────────────────────────────────────────── */

const spectrumLevels = [
  { label: 'Manual', desc: 'You do everything', color: 'bg-gray-600' },
  { label: 'Assisted', desc: 'AI drafts, you review', color: 'bg-accent-teal' },
  { label: 'Supervised', desc: 'AI executes, you approve', color: 'bg-accent-blue' },
  { label: 'Autonomous', desc: 'AI runs independently', color: 'bg-accent-purple' },
];

const spectrumRows = [
  ['Weekly reporting', 'Manual', 'Autonomous'],
  ['Competitor analysis', 'Manual', 'Supervised'],
  ['Client proposals', 'Manual', 'Assisted'],
  ['Team onboarding docs', 'Manual', 'Autonomous'],
  ['Financial summaries', 'Manual', 'Supervised'],
];

const SpectrumSection: React.FC = () => (
  <FadeInSection className="relative py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>The Framework</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          The Automation <span className="text-accent-blue">Spectrum</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Not everything should be automated at once. We map your operations and prioritise by
          impact.
        </p>
      </div>

      {/* Spectrum bar */}
      <div className="grid grid-cols-4 gap-1 mb-12">
        {spectrumLevels.map(({ label, desc, color }, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className={`h-2 ${color} rounded-full mb-3`} />
            <p className="font-semibold text-sm mb-1">{label}</p>
            <p className="text-text-muted text-xs">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Before/After table */}
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="grid grid-cols-3 bg-background-lighter p-4 text-sm font-semibold border-b border-white/5">
          <span>Operation</span>
          <span className="text-center text-text-muted">Today</span>
          <span className="text-center text-accent-blue">After Programme</span>
        </div>
        {spectrumRows.map(([op, before, after], i) => (
          <motion.div
            key={i}
            className={`grid grid-cols-3 p-4 text-sm ${
              i % 2 ? 'bg-background-lighter/20' : ''
            } border-b border-white/5 last:border-0`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <span className="text-text-secondary">{op}</span>
            <span className="text-center text-text-muted">{before}</span>
            <span className="text-center text-accent-blue font-medium">{after}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   8. Locations
   ───────────────────────────────────────────── */

const locations = [
  {
    city: 'London',
    country: 'United Kingdom',
    desc: "Europe's business capital. Premium venues in the City or Canary Wharf.",
    flag: '\uD83C\uDDEC\uD83C\uDDE7',
  },
  {
    city: 'Ingolstadt',
    country: 'Germany',
    desc: "Bavaria's innovation hub. A focused setting in the heart of southern Germany.",
    flag: '\uD83C\uDDE9\uD83C\uDDEA',
  },
  {
    city: 'Los Angeles',
    country: 'United States',
    desc: 'The West Coast stage. Downtown LA or Santa Monica.',
    flag: '\uD83C\uDDFA\uD83C\uDDF8',
  },
];

const LocationsSection: React.FC = () => (
  <FadeInSection id="locations" className="relative py-24 bg-background-lighter/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>Locations</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Three Cities. One Programme.{' '}
          <span className="text-accent-blue">Global Impact.</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          On-site only. 6–8 people per cohort. An intimate, focused environment designed for real
          outcomes.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {locations.map(({ city, country, desc, flag }, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-xl bg-background-dark border border-accent-blue/20 hover:border-accent-blue/50 transition-all text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="text-4xl mb-4">{flag}</div>
            <MapPin size={24} className="text-accent-blue mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-bold text-xl mb-1">{city}</h3>
            <p className="text-text-muted text-sm mb-3">{country}</p>
            <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            <p className="text-accent-blue/60 text-xs mt-4 font-medium">
              Dates TBD — Enquire below
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   9. Why NavAIgate
   ───────────────────────────────────────────── */

const whyPillars = [
  {
    title: 'Enterprise AI Delivery',
    desc: 'We build AI systems for companies like Autodesk. This is not theory — it is operational experience.',
  },
  {
    title: 'Practitioner-Led',
    desc: 'Every session is led by people who use AI Operating Systems to run their own businesses daily.',
  },
  {
    title: 'Outcome, Not Curriculum',
    desc: 'You leave with a working system, not a certificate. The measure is what you can do on Monday morning.',
  },
  {
    title: 'Model-Agnostic',
    desc: 'We teach the architecture, not a single tool. Your AIOS works with Claude, GPT, or whatever comes next.',
  },
  {
    title: 'Ongoing Partnership',
    desc: 'Post-programme support, community access, and quarterly updates as AI capabilities evolve.',
  },
  {
    title: 'Bespoke to Your Business',
    desc: "Every participant's AIOS is customised to their industry, team size, and operational challenges.",
  },
];

const WhySection: React.FC = () => (
  <FadeInSection className="relative py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionLabel>Why NavAIgate</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Your Guide Through the{' '}
          <span className="text-accent-blue">AI Transformation</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyPillars.map(({ title, desc }, i) => (
          <motion.div
            key={i}
            className="p-5 border-l-2 border-accent-blue/30 hover:border-accent-blue transition-all"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <h3 className="font-semibold mb-2 text-accent-blue">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   10. Apply / Contact Section (Tally Embed)
   ───────────────────────────────────────────── */

const ApplySection: React.FC = () => {
  useEffect(() => {
    const d = document;
    const w = 'https://tally.so/widgets/embed.js';
    const v = () => {
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
      } else {
        d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };
    if (typeof (window as any).Tally !== 'undefined') {
      v();
    } else if (!d.querySelector(`script[src="${w}"]`)) {
      const s = d.createElement('script');
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    } else {
      v();
    }
  }, []);

  return (
    <FadeInSection id="apply" className="relative py-24 bg-background-lighter/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionLabel>Get In Contact</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Your{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              AI Operating System?
            </span>
          </h2>
          <p className="text-text-secondary text-lg">
            One immersive day. 6–8 people. On-site only. Enquire about pricing and availability.
          </p>
        </div>

        <motion.div
          className="rounded-2xl bg-background-dark border border-white/10 p-6 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=0&transparentBackground=1&dynamicHeight=1`}
            loading="lazy"
            width="100%"
            height="500"
            frameBorder={0}
            title="AIOS Programme Application"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 text-text-muted text-sm">
          <span className="font-medium text-text-secondary">Daniel Wright</span>
          <span className="hidden sm:inline text-text-muted/30">&middot;</span>
          <a href="mailto:dw@navaigate.dev" className="hover:text-accent-blue transition-colors">
            dw@navaigate.dev
          </a>
          <span className="hidden sm:inline text-text-muted/30">&middot;</span>
          <a
            href="https://navaigate.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors"
          >
            navaigate.dev
          </a>
        </div>
      </div>
    </FadeInSection>
  );
};

/* ─────────────────────────────────────────────
   Accordion Component
   ───────────────────────────────────────────── */

const AccordionItem: React.FC<{
  title: string;
  subtitle?: string;
  index: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, subtitle, index, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="border-b border-white/5 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 sm:py-8 text-left group"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-accent-blue font-bold text-lg sm:text-xl tabular-nums min-w-[2rem]">{index}</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-white transition-colors">{title}</h3>
            {subtitle && <p className="text-text-muted text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-blue/50 transition-colors"
        >
          <span className="text-text-secondary text-xl leading-none">+</span>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-8 pl-10 sm:pl-16">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Accordion Body — All sections as expandable cards
   ───────────────────────────────────────────── */

const AccordionBody: React.FC = () => (
  <section className="relative py-16 sm:py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">

      <AccordionItem index="01" title="Our Manifesto" subtitle="What we believe about AI in business" defaultOpen>
        <div className="grid sm:grid-cols-2 gap-5">
          {manifestoPillars.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="p-5 rounded-xl bg-background-lighter/50 border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-accent-blue" />
              </div>
              <h4 className="font-bold text-sm mb-2">{title}</h4>
              <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="02" title="What You Walk Away With" subtitle="Concrete outcomes from a single day">
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {outcomes.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background-lighter/50 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={16} className="text-accent-blue" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{title}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(({ value, label }, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-background-lighter/30 border border-white/5">
              <p className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">{value}</p>
              <p className="text-text-muted text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="03" title="The Day" subtitle="One immersive day with Claude Code — from zero to operating system">
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          This is not a lecture series. It is one intensive, hands-on day where you build your AI Operating System
          using Claude Code — on real business problems (yours). The principles apply to any AI platform,
          but we teach it through the most powerful tool available today. You leave with a working system.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {sessions.map(({ num, title, desc, icon: Icon }) => (
            <div key={num} className="relative p-4 rounded-xl bg-background-lighter/50 border border-white/5 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-accent-blue font-bold text-sm">{num}</span>
                <Icon size={14} className="text-text-muted group-hover:text-accent-blue transition-colors" />
              </div>
              <h4 className="font-semibold text-xs">{title}</h4>
              <p className="text-text-muted text-[11px] leading-relaxed mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
          <p className="text-text-secondary text-sm">
            <span className="text-accent-blue font-semibold">What happens next?</span> After the day, there is an opportunity
            to continue with an extended programme — deeper integrations, advanced automations, and ongoing support to scale
            your AIOS across your entire organisation.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem index="04" title="Real Results" subtitle="What founders built in a single day">
        <p className="text-text-secondary text-sm mb-6">
          6 non-technical founders. One day. Zero coding experience. Real systems, deployed:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map(({ title, desc }, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background-lighter/50 border border-white/5">
              <CheckCircle2 size={16} className="text-accent-teal mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-xs mb-1">{title}</h4>
                <p className="text-text-muted text-[11px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="05" title="Who Is This For" subtitle="Built for senior leaders, not developers">
        <div className="grid sm:grid-cols-2 gap-5">
          {audienceCards.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background-lighter/50 border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent-blue" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{title}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="06" title="The Automation Spectrum" subtitle="Map your operations from manual to autonomous">
        <div className="grid grid-cols-4 gap-1 mb-8">
          {spectrumLevels.map(({ label, desc, color }, i) => (
            <div key={i} className="text-center">
              <div className={`h-2 ${color} rounded-full mb-3`} />
              <p className="font-semibold text-xs mb-1">{label}</p>
              <p className="text-text-muted text-[10px]">{desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/5 overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-background-lighter p-3 font-semibold border-b border-white/5 text-xs">
            <span>Operation</span>
            <span className="text-center text-text-muted">Today</span>
            <span className="text-center text-accent-blue">After</span>
          </div>
          {spectrumRows.map(([op, before, after], i) => (
            <div key={i} className={`grid grid-cols-3 p-3 text-xs ${i % 2 ? 'bg-background-lighter/20' : ''} border-b border-white/5 last:border-0`}>
              <span className="text-text-secondary">{op}</span>
              <span className="text-center text-text-muted">{before}</span>
              <span className="text-center text-accent-blue font-medium">{after}</span>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="07" title="Locations" subtitle="On-site only — 6–8 people per cohort">
        <div className="grid sm:grid-cols-3 gap-5">
          {locations.map(({ city, country, desc, flag }, i) => (
            <div key={i} className="p-5 rounded-xl bg-background-lighter/50 border border-accent-blue/15 text-center">
              <div className="text-3xl mb-3">{flag}</div>
              <h4 className="font-bold text-lg mb-1">{city}</h4>
              <p className="text-text-muted text-xs mb-2">{country}</p>
              <p className="text-text-secondary text-xs leading-relaxed">{desc}</p>
              <p className="text-accent-blue/60 text-[10px] mt-3 font-medium">Dates TBD</p>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem index="08" title="Why NavAIgate" subtitle="Your guide through the AI transformation">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyPillars.map(({ title, desc }, i) => (
            <div key={i} className="p-4 border-l-2 border-accent-blue/30">
              <h4 className="font-semibold text-sm mb-1 text-accent-blue">{title}</h4>
              <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </AccordionItem>

    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */

const AIOSProgrammePage: React.FC = () => (
  <div className="min-h-screen bg-background-dark text-text-primary">
    <HeroSection />
    <AccordionBody />
    <ApplySection />
  </div>
);

export default AIOSProgrammePage;
