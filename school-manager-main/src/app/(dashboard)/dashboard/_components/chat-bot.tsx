"use client";
import { MessageCircle, SendHorizonal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChat } from "ai/react";

export const ChatBot = () => {
  const [isOpen, setOpen] = useState(false);
  const { input, handleInputChange, handleSubmit, messages } = useChat();
  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end gap-2">
      {isOpen ? (
        <Card className="flex h-[400px] w-[350px] flex-col">
          <CardHeader className="border-b border-border px-4 pb-2">
            <CardTitle>Chat bot</CardTitle>
            <CardDescription>Ask me anything</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 px-4 py-2">
            <div className="mt-auto flex h-[238px] flex-col gap-1 overflow-y-auto">
              {messages.map((message, index) => {
                if (message.role === "assistant")
                  return (
                    <div key={index} className="w-full">
                      <div className="w-fit max-w-[280px] rounded-[18px] bg-secondary px-4 py-2">
                        <p className="text-sm">
                          {message.content
                            .split("\n")
                            .map((currentTextBlock, index) => {
                              if (currentTextBlock === "")
                                return <p key={index}> </p>;
                              return <p key={index}>{currentTextBlock}</p>;
                            })}
                        </p>
                      </div>
                    </div>
                  );
                return (
                  <div key={index} className="w-full">
                    <div className="ml-auto w-fit max-w-[280px] rounded-[18px] bg-primary px-4 py-2">
                      <p className="text-sm text-primary-foreground">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-shrink-0 items-center justify-center border-t border-border px-4 py-4">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex w-full items-center gap-2">
                <Input
                  placeholder="Enter Message"
                  className="h-10 w-full rounded-full"
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  className="size-10 rounded-full p-0"
                >
                  <SendHorizonal className="size-4" />
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      ) : null}
      <Button
        onClick={() => setOpen((init) => !init)}
        className="h-12 w-12 rounded-full"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>
    </div>
  );
};
