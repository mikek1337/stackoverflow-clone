import Editor from "@/components/editor";
import QuestionForm from "@/components/questionform";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container ">
      <div className="my-12 ">
        <h1 className="text-3xl font-semibold">Ask a public question</h1>
      </div>
      <div className="border-2 rounded-md p-6 w-fit">
        <h3 className="text-2xl py-1 mt-3 ">Writing a good question</h3>
        <p className="w-auto mb-3">
          Youre ready to ask a programming-related question and this form will
          help guide you through the process.
        </p>
        <h6 className="font-semibold">Steps</h6>
        <ul className="list-disc pl-10">
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in detail.</li>
          <li>Describe what you tried and what you expect to happen.</li>
          <li>
            Add tags which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
     
      <QuestionForm />
    
    </div>
  );
};

export default page;
