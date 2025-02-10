import SwiftUI
import SwiftData

// MARK: - Content View
struct ContentView: View {
    @Environment(\.modelContext) private var context
    @Query private var items: [Item]
    @State private var newItem: String = ""
    
    var body: some View {
        NavigationView {
            VStack {
                TextField("Enter item", text: $newItem)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                
                Button("Add Item") {
                    let item = Item(text: newItem, date: Date())
                    context.insert(item)
                    newItem = ""
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                List {
                    ForEach(items) { item in
                        VStack(alignment: .leading) {
                            Text(item.text)
                            Text(item.date, style: .date)
                                .font(.caption)
                                .foregroundColor(.gray)
                        }
                    }
                    .onDelete { indexSet in
                        for index in indexSet {
                            context.delete(items[index])
                        }
                    }
                }
            }
            .navigationTitle("Items")
        }
    }
}
