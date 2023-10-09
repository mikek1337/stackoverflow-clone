import { FC, Suspense } from "react";
import AddQuestion from "@/components/addquestion";
import QuestionTabs from "@/components/tabs";
import Loading from "../loading";

const page: FC = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full">
        <div className="">
          <div className="flex flex-row justify-between py-5">
            <h1 className="text-2xl md:text-4xl">Top Questions</h1>
            <AddQuestion />
          </div>
          <div className="my-5">
            <QuestionTabs />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
