import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Subtle vertical line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

        {entries.map((entry, index) => (
          <motion.div
            key={index}
            className="relative pl-8 pb-8 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-1 top-[6px] w-3 h-3 rounded-full bg-primary border-2 border-background" />

            {/* Content */}
            <div className="text-sm font-semibold text-foreground mb-0.5">
              {entry.title}
            </div>

            <div className="text-xs text-muted-foreground mb-2">{entry.date}</div>

            <Card className="border-border/50 shadow-none">
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {entry.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
