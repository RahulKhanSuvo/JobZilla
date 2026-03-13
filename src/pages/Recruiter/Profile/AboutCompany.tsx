import CommonWrapper from "@/components/common/CommonWrapper";

export default function AboutCompany() {
  return (
    <div className="space-y-6">
      <CommonWrapper className="p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">About Company</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Are you a User Experience Designer with a track record of
              delivering intuitive digital experiences that drive results? Are
              you a strategic storyteller and systems thinker who can concept
              and craft smart, world-class campaigns across a variety of
              mediums?
            </p>
            <p>
              Deloitte's Green Dot Agency is looking to add a Lead User
              Experience Designer to our experience design team. We want a
              passionate creative who's inspired by new trends and emerging
              technologies, and is able to integrate them into memorable user
              experiences. A problem solver who is entrepreneurial,
              collaborative, hungry, and humble; can deliver beautifully
              designed, leading-edge experiences under tight deadlines; and who
              has demonstrated proven expertise.
            </p>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
