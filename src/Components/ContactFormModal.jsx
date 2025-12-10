// import { useEffect, useState } from "react";
// import { useFormState } from "react-dom";

// // Contact Form Modal - Tailwind v4.1 Ready
// const ContactFormModal = ({ isOpen, onClose, initialTab = "contact" }) => {
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [needsSession, setNeedsSession] = useState(false);
//   const [errors, setErrors] = useFormState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     projectType: "",
//     technology: "",
//     budget: "",
//     description: "",
//     sessionDate: "",
//     sessionTime: "",
//   });

//   useEffect(() => {
//     setActiveTab(initialTab);
//   }, [initialTab]);

//   if (!isOpen) return null;

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email is invalid";

//     if (activeTab === "contact") {
//       if (!formData.message.trim()) newErrors.message = "Message is required";
//     } else {
//       if (!formData.projectType)
//         newErrors.projectType = "Project type is required";
//       if (!formData.technology) newErrors.technology = "Technology is required";
//       if (!formData.budget) newErrors.budget = "Budget is required";
//       if (!formData.description.trim())
//         newErrors.description = "Description is required";

//       if (needsSession) {
//         if (!formData.sessionDate) newErrors.sessionDate = "Date is required";
//         if (!formData.sessionTime) newErrors.sessionTime = "Time is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted:", { tab: activeTab, data: formData });
//       setShowSuccess(true);

//       setTimeout(() => {
//         setShowSuccess(false);
//         onClose();
//         setFormData({
//           name: "",
//           email: "",
//           message: "",
//           projectType: "",
//           technology: "",
//           budget: "",
//           description: "",
//           sessionDate: "",
//           sessionTime: "",
//         });
//         setNeedsSession(false);
//         setErrors({});
//       }, 2000);
//     }
//   };

//   // ---------------- FORM CHANGE ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
//       <div className="bg-white rounded-2xl max-w-2xl w-full my-10 relative shadow-xl animate-fade-in">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* SUCCESS MESSAGE */}
//         {showSuccess ? (
//           <div className="p-10 text-center">
//             <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Check size={40} className="text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-olive-800 mb-2">Success!</h3>
//             <p className="text-gray-600 text-lg">
//               We'll get back to you shortly.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* TABS */}
//             <div className="flex border-b border-gray-200">
//               <button
//                 onClick={() => setActiveTab("contact")}
//                 className={`flex-1 py-4 text-center font-medium transition-colors ${
//                   activeTab === "contact"
//                     ? "text-olive-700 border-b-2 border-olive-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 Contact Us
//               </button>

//               <button
//                 onClick={() => setActiveTab("quote")}
//                 className={`flex-1 py-4 text-center font-medium transition-colors ${
//                   activeTab === "quote"
//                     ? "text-olive-700 border-b-2 border-olive-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 Get a Quote
//               </button>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleSubmit} className="p-8 space-y-5">
//               {/* NAME */}
//               <InputField
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your Name"
//                 error={errors.name}
//               />

//               {/* EMAIL */}
//               <InputField
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Your Email"
//                 error={errors.email}
//               />

//               {/* IF CONTACT TAB */}
//               {activeTab === "contact" ? (
//                 <TextAreaField
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   error={errors.message}
//                 />
//               ) : (
//                 <>
//                   {/* PROJECT TYPE */}
//                   <SelectField
//                     name="projectType"
//                     value={formData.projectType}
//                     onChange={handleChange}
//                     options={siteData.formOptions.projectTypes}
//                     placeholder="Select Project Type"
//                     error={errors.projectType}
//                   />

//                   {/* TECH */}
//                   <SelectField
//                     name="technology"
//                     value={formData.technology}
//                     onChange={handleChange}
//                     options={siteData.formOptions.technologies}
//                     placeholder="Select Technology"
//                     error={errors.technology}
//                   />

//                   {/* BUDGET */}
//                   <SelectField
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleChange}
//                     options={siteData.formOptions.budgets}
//                     placeholder="Select Budget"
//                     error={errors.budget}
//                   />

//                   {/* DESCRIPTION */}
//                   <TextAreaField
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Project Description"
//                     error={errors.description}
//                   />

//                   {/* SESSION CHECKBOX */}
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       id="needsSession"
//                       checked={needsSession}
//                       onChange={(e) => setNeedsSession(e.target.checked)}
//                       className="h-4 w-4 rounded text-olive-600 focus:ring-olive-500"
//                     />
//                     <label htmlFor="needsSession" className="text-gray-700">
//                       Need a live 1-on-1 session
//                     </label>
//                   </div>

//                   {/* SESSION DATE + TIME */}
//                   {needsSession && (
//                     <div className="grid grid-cols-2 gap-4">
//                       <InputField
//                         type="date"
//                         name="sessionDate"
//                         value={formData.sessionDate}
//                         onChange={handleChange}
//                         error={errors.sessionDate}
//                       />
//                       <InputField
//                         type="time"
//                         name="sessionTime"
//                         value={formData.sessionTime}
//                         onChange={handleChange}
//                         error={errors.sessionTime}
//                       />
//                     </div>
//                   )}
//                 </>
//               )}

//               {/* SUBMIT BUTTON */}
//               <button
//                 type="submit"
//                 className="
//                   w-full mt-4 px-6 py-3
//                   bg-olive-600 text-white rounded-lg
//                   hover:bg-olive-700 hover:scale-105
//                   transition-all duration-300 shadow-md font-medium
//                 "
//               >
//                 Submit
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ContactFormModal;

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { FaCheck } from "react-icons/fa"; // Update if using different icons
import { IoClose } from "react-icons/io5";

// Contact Form Modal - Tailwind v4.1 Ready
const ContactFormModal = ({ isOpen, onClose, initialTab = "contact" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showSuccess, setShowSuccess] = useState(false);
  const [needsSession, setNeedsSession] = useState(false);

  // React 19 replacement for useFormState
  const [errors, setErrors] = useActionState((prev, next) => next, {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "",
    technology: "",
    budget: "",
    description: "",
    sessionDate: "",
    sessionTime: "",
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (activeTab === "contact") {
      if (!formData.message.trim()) newErrors.message = "Message is required";
    } else {
      if (!formData.projectType)
        newErrors.projectType = "Project type is required";
      if (!formData.technology) newErrors.technology = "Technology is required";
      if (!formData.budget) newErrors.budget = "Budget is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";

      if (needsSession) {
        if (!formData.sessionDate) newErrors.sessionDate = "Date is required";
        if (!formData.sessionTime) newErrors.sessionTime = "Time is required";
      }
    }

    setErrors(newErrors); // Works with useActionState
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { tab: activeTab, data: formData });
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({
          name: "",
          email: "",
          message: "",
          projectType: "",
          technology: "",
          budget: "",
          description: "",
          sessionDate: "",
          sessionTime: "",
        });
        setNeedsSession(false);
        setErrors({});
      }, 2000);
    }
  };

  // ---------------- FORM CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-10 relative shadow-xl animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* SUCCESS MESSAGE */}
        {showSuccess ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-olive-800 mb-2">Success!</h3>
            <p className="text-gray-600 text-lg">
              We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* TABS */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === "contact"
                    ? "text-olive-700 border-b-2 border-olive-600"
                    : "text-gray-500"
                }`}
              >
                Contact Us
              </button>

              <button
                onClick={() => setActiveTab("quote")}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === "quote"
                    ? "text-olive-700 border-b-2 border-olive-600"
                    : "text-gray-500"
                }`}
              >
                Get a Quote
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* FORM FIELDS */}
              {/* ... your InputField, TextAreaField, SelectField remain unchanged ... */}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="
                  w-full mt-4 px-6 py-3 
                  bg-olive-600 text-white rounded-lg 
                  hover:bg-olive-700 hover:scale-105 
                  transition-all duration-300 shadow-md font-medium
                "
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;
