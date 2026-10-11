<template>
    <main class="quiz-page">
        <form class="quiz-form" @submit.prevent="submitQuiz">
            <div class="student-field">
                <label for="studentName">ชื่อ-สกุล</label>
                <input id="studentName" v-model="studentName" type="text" autocomplete="name" />
            </div>

            <section v-for="(question, index) in questions" :key="question.id" class="question">
                <p class="question-title">
                    {{ index + 1 }}. {{ question.question }}
                </p>

                <div class="choices">
                    <label v-for="choice in question.choices" :key="choice.value" class="choice">
                        <input v-model="answers[question.id]" type="radio" :name="`question-${question.id}`"
                            :value="choice.value" />
                        <span>{{ choice.label }}</span>
                    </label>
                </div>
            </section>

            <div>
                <button type="submit" class="submit-button">
                    {{ submitted ? 'สอบอีกครั้ง' : 'ส่งข้อสอบ' }}
                </button>
                
                <span v-if="submitted" class="submit-message" role="status">
                    คุณ {{ studentName }} สอบได้คะแนน :
                    {{ score }}/{{ questions.length }}
                </span>
            </div>

        </form>
    </main>
</template>

<script setup lang="ts">
import { API } from '@/services'
// import type { QuestionIDList } from '@/types/Question'
import { onMounted, reactive, ref } from 'vue'

interface Question {
    id: number
    question: string
    choices: {
        label: string
        value: string
    }[]
}

const studentName = ref('')
const score = ref(0)

const questions = reactive<Question[]>([])

const answers = reactive<Record<number, string>>({})
const submitted = ref(false)

onMounted(async () => {
    var { status, data } = await API.QuestionService.GetAllQuestions()
    // console.log(status)
    // console.log(data)

    if (status == 200) {
        const mapData = data.map((contain: any) => ({
            ...contain,
            question: contain.question,
            choices: contain.choices.map((c: any) => ({
                label: c.choice,
                value: c.id
            }))
        }))

        questions.push(...mapData)
        console.log("questions: ", questions)
    }
})

function submitQuiz() {
    if (submitted.value) {
        console.log("Take the test again")

        clearFeild()
    } else {
        console.log("Submit a test")
        // TODO: disable studentName input after click submit
        var payload = {
            name: studentName.value,
            answer_list: Object.keys(answers).map((key) => {
                return { id: answers[Number(key)] }
            })
        }
        console.log("payload: ", payload)
        saveAndGetScore(payload)
    }

    submitted.value = !submitted.value
}

function clearFeild() {
    studentName.value = ""
    Object.keys(answers).forEach((key) => {
        delete answers[Number(key)]
    })
}

async function saveAndGetScore(payload: any) {
    var { status, data } = await API.UserService.SaveAndGetScore(payload)
    console.log("status: ", status)
    console.log("data: ", data)

    if (status == 200) {
        score.value = data.user.score
    }
}

</script>

<style scoped>
* {
    box-sizing: border-box;
}

.quiz-page {
    width: 100%;
    min-height: 100vh;
    padding: 2px;
    background: #fff;
    color: #111;
    font-family: Arial, Tahoma, sans-serif;
    font-size: 13px;
}

.quiz-form {
    min-height: 306px;
    border: 1px solid #444;
    padding: 4px 32px 32px;
}

.student-field {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 4px;
}

.student-field label {
    flex-shrink: 0;
}

.student-field input {
    width: 230px;
    max-width: 100%;
    height: 16px;
    padding: 1px 4px;
    border: 1px solid #777;
    border-radius: 0;
    font: inherit;
}

.question {
    margin-bottom: 13px;
}

.question-title {
    margin: 0 0 5px;
    line-height: 1.4;
}

.choices {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
}

.choice {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 17px;
    cursor: pointer;
}

.choice input[type='radio'] {
    width: 13px;
    height: 13px;
    margin: 0 0 0 6px;
    accent-color: #777;
    cursor: pointer;
}

.submit-button {
    margin-top: 9px;
    padding: 6px 15px;
    border: none;
    border-radius: 0;
    background: #4472c4;
    color: white;
    font-size: 12px;
    cursor: pointer;
}

.submit-button:hover {
    background: #345da8;
}

.submit-message {
    margin-top: 12px;
    margin-left: 4em;
    color: black;
}

@media (max-width: 480px) {
    .quiz-form {
        padding-right: 14px;
        padding-left: 14px;
    }

    .student-field input {
        width: 100%;
        min-width: 0;
    }
}
</style>
