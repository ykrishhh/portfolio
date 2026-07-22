export function SkillCategory({ name, icon: Icon, skills }) {
  return (
    <div className="skill-category">
      <div className="skill-category__header">
        <Icon className="skill-category__icon" aria-hidden="true" />
        <h3 className="skill-category__name">{name}</h3>
      </div>
      <ul className="skill-category__list">
        {skills.map((skill) => (
          <li key={skill} className="skill-category__item">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
