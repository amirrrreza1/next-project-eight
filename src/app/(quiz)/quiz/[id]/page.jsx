import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SingleQuestions from "@/Components/SingleQuestions/SingleQuestions";
import { verifyJWT } from "@/lib/jwt";

const BASE_URL = "https://next-project-seven-eta.vercel.app";

const QuizSinglePage = async ({ params }) => {
  const token = cookies().get("token")?.value;

  const user = await verifyJWT(token);

  if (!user) {
    redirect("/login");
  }

  const { id } = params;

  const res = await fetch(`${BASE_URL}/api/questions/${id}`);
  const data = await res.json();

  const allRes = await fetch(`${BASE_URL}/api/questions`);
  const allData = await allRes.json();
  const totalQuestions = allData.QUESTIONS.length;

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-[#1B1D24] text-[#1B1D24]"
      style={{ height: `calc(100vh - 60px)` }}
    >
      <div className="w-[98%] max-w-[600px] h-2/3 min-h-fit bg-[#5D9D0B] rounded-2xl shadow-2xl">
        <SingleQuestions
          id={+id}
          question={data.selected.question}
          options={data.selected.options}
          correctOption={data.selected.correctAnswer}
          totalQuestions={totalQuestions}
          score={data.selected.score}
          difficulty={data.selected.level}
        />
      </div>
    </div>
  );
};

export default QuizSinglePage;

export const generateMetadata = () => {
  return {
    title: "Quiz Single Page",
  };
};
