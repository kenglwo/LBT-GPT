class ApiController < ApplicationController
    def test
        render json: {"status": "success"}

    end

    def save_student_data
        data_id = params['data_id']
        data = params['data']
        student_id = params['student_id']
        api_status = ""

        if data_id == 'answer_data' then
            data.each do |d|
                question_id = d[:question_id]
                answer = d[:answer]
                new_data = AnswerDatum.new(student_id: student_id, question_id: question_id, answer: answer)
                
                if new_data.save
                    api_status = "success"
                else
                    api_status = "failed"
                end
            end

        elsif data_id == 'conversation_data' then

        end
        render json: {"status": api_status}
    end
end
