"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axiosInstance from "@/_config/axiosInstance";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import dotenv from 'dotenv'
import { toast } from "sonner";
import Image from 'next/image'
dotenv.config()

export default function Home() {
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [progress, setProgress] = useState(100);
  const [loading, setLoading] = useState(false);


  async function handleSend(message: string) {
    if (message === null) {
      return;
    }

    if (message === "") {
      return;
    }

    setSuggestion(null);

    try {
      const timer = setTimeout(() => setProgress(50), 300);
      setLoading(true);
      const response = await axiosInstance.post("/get/suggest", { code: message });
      clearTimeout(timer);

      setProgress(100);
      setSuggestion(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion(null);
      setProgress(100);
    }

  }

  const copyMessage = async () => {
    if (suggestion === null) {
      return;
    }
    

    await navigator.clipboard.writeText("git add . " + "\n" + suggestion);
    setMessage("");
    toast("Stylish Commit Message has been copied in your clipboard.")


  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-4">
          <div className="flex flex-inline space-x-64">
            <p className = "justify-start italic">For those who don't have a taste</p>
            <Image src="favicon.ico" alt = "icon" />
          </div>
          <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl mb-4">Git Well Committed</h1>
          <p className="mb-4 italic">and for those who have taste....</p>

          <div className="grid w-full gap-2">
            <Textarea placeholder="Type your message here." value={message} onChange={(e) => setMessage(e.target.value)} />

            {loading ? <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button> :

              <Button onClick={() => handleSend(message)}>
                Send message
              </Button>}

            <div className="mt-4 container mx-auto">

              <div className="rounded outline mb-4 p-4">{suggestion ? suggestion :
                <Progress value={progress} className="width-[60%]" />
              }
              </div>
              <Button onClick={copyMessage} disabled={!suggestion}>Copy me</Button>


            </div>
          </div>
        </div>

      </div>
    </>
  );
}
