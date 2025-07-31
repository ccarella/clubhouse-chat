import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Clubhouse Chat
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time conversations powered by AI. Connect, collaborate, and communicate seamlessly.
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <Link href="/chat">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Chatting
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg border bg-card">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Instant responses powered by cutting-edge AI technology
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Conversations</h3>
            <p className="text-muted-foreground">
              Engage in meaningful dialogues with context-aware AI
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your conversations are protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
