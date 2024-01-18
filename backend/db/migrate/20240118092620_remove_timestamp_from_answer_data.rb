class RemoveTimestampFromAnswerData < ActiveRecord::Migration[6.1]
  def change
    remove_column :answer_data, :timestamp, :datetime
  end
end
