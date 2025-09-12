
import { introText, storyText, missionText, values, whyChooseUs, teamMembers } from "../services/companyInfo";
import { GradientBrandText } from "../services/gradientBrandText" 

// ====== About Page Component ======
export default function About() {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-[1500px] p-2">
        {/* Intro Section */}
        <section className="pb-12">
          <h1 className="text-3xl pb-4 text-center font-extrabold text-gray-900">
            About <GradientBrandText className="text-3xl font-extrabold" />
          </h1>

          <p className="text-gray-700 leading-relaxed">{introText}</p>
        </section>

        {/* Story Section */}
        <section className="pb-12">
          <h2 className="text-lg font-semibold text-gray-800 pb-2">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed">{storyText}</p>
        </section>

        {/* Mission Section */}
        <section className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 pb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">{missionText}</p>
        </section>

        {/* Values Section */}
        <section className="py-12">
          <h2 className="text-lg font-semibold text-gray-800 pb-4 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4"
                style={{ borderColor: "#ED4930" }}
              >
                <h3 className="font-bold text-md text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="pb-12">
          <h2 className="text-lg pb-4 font-semibold text-gray-800 text-center">
            Why Choose <GradientBrandText />?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            {whyChooseUs.map((point, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4"
                style={{ borderColor: "#ED4930" }}
              >
                <span className="text-gray-800 font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Meet Our Team Section */}
        <section className="pb-12">
          <h2 className="text-lg font-semibold text-gray-800 pb-4 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-t-4"
                style={{ borderColor: "#ED4930" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover object-top"
                />
                <h3 className="font-bold text-lg text-gray-900 pt-4">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Statement */}
        <p className="text-center text-lg font-semibold text-gray-800">
          <GradientBrandText /> – Your One-Stop Destination for Fashion &
          Technology.
        </p>
      </div>
    </div>
  );
}
