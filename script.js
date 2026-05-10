const BACKEND_URL =
  "https://thamai-backend-new.onrender.com/chat";

const chatBox =
  document.getElementById("chat-box");

const userInput =
  document.getElementById("user-input");

const sendBtn =
  document.getElementById("send-btn");

/* =========================================
   GỬI TIN NHẮN
========================================= */

async function sendMessage() {

  const text = userInput.value.trim();

  if (!text) return;

  addMessage(text, "user");

  userInput.value = "";

  addMessage(
    "⏳ ThamAI đang suy nghĩ...",
    "bot",
    "loading"
  );

  try {

    const response = await fetch(
      BACKEND_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: text
        })
      }
    );

    removeLoading();

    if (!response.ok) {

      addMessage(
        `❌ Lỗi server: ${response.status}`,
        "bot"
      );

      return;
    }

    const data =
      await response.json();

    const reply =
      data.reply ||
      "⚠️ AI không phản hồi.";

    addMessage(reply, "bot");

  } catch (error) {

    console.error(error);

    removeLoading();

    addMessage(
      "❌ Không kết nối được AI backend.",
      "bot"
    );
  }
}

/* =========================================
   HIỂN THỊ TIN NHẮN
========================================= */

function addMessage(
  text,
  sender,
  extraClass = ""
) {

  const msg =
    document.createElement("div");

  msg.className =
    `message ${sender} ${extraClass}`;

  msg.innerHTML = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop =
    chatBox.scrollHeight;
}

/* =========================================
   XÓA LOADING
========================================= */

function removeLoading() {

  const loading =
    document.querySelector(".loading");

  if (loading) {
    loading.remove();
  }
}

/* =========================================
   BUTTON CLICK
========================================= */

sendBtn.addEventListener(
  "click",
  sendMessage
);

/* =========================================
   ENTER KEY
========================================= */

userInput.addEventListener(
  "keypress",
  function(e) {

    if (e.key === "Enter") {
      sendMessage();
    }
  }
);

