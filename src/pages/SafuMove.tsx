import InterviewLayout from "@/components/InterviewLayout";

const SafuMove = () => {
  const links = [
    { label: "@HyperM0nkey1", url: "https://x.com/HyperM0nkey1" },
    { label: "safumove.com", url: "https://safumove.com/" },
  ];

  return (
    <InterviewLayout
      title="Movement Meets Vibecoding"
      videoId="707zNS6u_ew"
      links={links}
    >
      <p>
        I spent a good hour talking with <strong>Jonathan Magno</strong>, the mind behind <strong>SAFU Move,</strong> and it was one of those chats where you can <em>feel</em> the passion behind the project.
      </p>

      <p>
        Jonathan is building SAFU, a <strong>movement app</strong> that gives you <strong>instant feedback while you exercise</strong>, helping you move better and gamifying the whole experience. It's not just about counting reps or tracking workouts, it's about learning to move properly, while having fun doing it.
      </p>

      <p>
        What really stands out is how much he wants to <em>help people</em>. He's both an <strong>engineer and a former coach</strong>, and that mix shows in everything he's building. At the beginning of 2025, he started <strong>vibecoding</strong>. That early idea evolved into SAFU Move, where he's now merging <strong>vibecoding</strong> with <strong>motion capture</strong>, taking it to the next level.
      </p>

      <p>
        We talked about how this is more than just another fitness tracker. Jonathan is building a <strong>game,</strong> one that connects three worlds: vibe coding, video games, and movement. It's about improving personal health and habits while still having fun, something that feels more natural and motivating than a standard workout app.
      </p>

      <p>
        He's taking a big step forward by bringing <strong>motion capture</strong> to vibecoding, using his engineering background and <strong>AI as leverage</strong> to make it work.
      </p>
    </InterviewLayout>
  );
};

export default SafuMove;
