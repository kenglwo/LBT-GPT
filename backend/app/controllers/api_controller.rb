require 'base64'
require 'fileutils'

class ApiController < ApplicationController
    def test
        render json: {"status": "success"}

    end

    def save_student_info
        student_id = params['student_id']
        student_name = params['student_name']
        api_status = ""

        new_data = StudentInfo.new(student_id: student_id, student_name: student_name)
        api_status = new_data.save ? "success" : "failed"

        render json: {"status": api_status}
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
                
                api_status = new_data.save ? "success" : "failed"
            end

        elsif data_id == 'conversation_data' then
            role = data[:role]
            type = data[:type]
            prompt_data = nil
            if type == 'image_url' then
                base64_image = data[:content].split(',').last
                decoded_image = Base64.decode64(base64_image)
                timestamp = data[:timestamp].gsub(" ", "_").gsub(":", "-")
                filename = "#{student_id}_#{timestamp}.png"
                file_path = Rails.public_path.join(student_id, filename)
                logger.debug file_path
                FileUtils.mkdir_p(File.dirname(file_path))
                File.open(file_path, 'wb') { |file| file.write(decoded_image) }
                prompt_data = file_path
            elsif type == 'text' then
                prompt_data = data[:content]
            end
            new_data = ConversationDatum.new(student_id: student_id, role: role, prompt: prompt_data)
            api_status = new_data.save ? "success" : "failed"
        elsif data_id == 'quiz_conversation_data' then
            role = data[:role]
            type = data[:type]
            prompt_data = nil
            if type == 'image_url' then
                base64_image = data[:content].split(',').last
                decoded_image = Base64.decode64(base64_image)
                timestamp = data[:timestamp].gsub(" ", "_").gsub(":", "-")
                filename = "#{student_id}_#{timestamp}.png"
                file_path = Rails.public_path.join(student_id, filename)
                logger.debug file_path
                FileUtils.mkdir_p(File.dirname(file_path))
                File.open(file_path, 'wb') { |file| file.write(decoded_image) }
                prompt_data = file_path
            elsif type == 'text' then
                prompt_data = data[:content]
            end
            new_data = QuizConversationDatum.new(student_id: student_id, role: role, prompt: prompt_data)
            api_status = new_data.save ? "success" : "failed"
        end

        render json: {"status": api_status}
    end
end
